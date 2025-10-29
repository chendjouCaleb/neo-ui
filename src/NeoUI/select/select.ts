import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild,
  ContentChildren, Directive,
  ElementRef, EventEmitter, forwardRef,
  inject, InjectionToken,
  Input, OnDestroy, OnInit, Output,
  QueryList,
  ViewChild,
  viewChild,
  ViewEncapsulation
} from "@angular/core";
import {MY_TEXT_FIELD, MyTextField} from '../textField';
import {TextFieldControl} from '../textField/textFieldControl';
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {CdkPortal} from '@angular/cdk/portal';
import {_IdGenerator} from '@angular/cdk/a11y';
import {hasModifierKey} from '@angular/cdk/keycodes';
import {SelectionModel} from '@angular/cdk/collections';
import {MyOption, MyOptionSelectionChange} from './option';
import {NgClass} from '@angular/common';
import {defer, filter, map, merge, Observable, startWith, Subject, switchMap, takeUntil} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {MY_RADIO_CONTROL_VALUE_ACCESSOR} from '../radio';
import {getMySelectNonArrayValueError, getMySelectNonFunctionValueError} from './select-errors';


/** Change event object that is emitted when the select value has changed. */
export class MySelectChange<T = any> {
  constructor(
    /** Reference to the select that emitted the change event. */
    public source: MySelect,
    /** Current value of the select that emitted the event. */
    public value: T,
  ) {
  }
}

/**
 * Injection token that can be used to reference instances of `MySelectTrigger`. It serves as
 * alternative token to the actual `MySelectTrigger` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MY_SELECT_TRIGGER = new InjectionToken<MySelectTrigger>('MySelectTrigger');

/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
@Directive({
  selector: 'MySelectTrigger',
  providers: [{provide: MY_SELECT_TRIGGER, useExisting: MySelectTrigger}],
})
export class MySelectTrigger {}


/**
 * Provider Expression that allows Select to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const MY_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MySelect),
  multi: true
};

@Component({
  selector: 'MySelect',
  exportAs: 'mySelect',
  templateUrl: 'select.html',
  styleUrl: 'select.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'role': 'combobox',
    'aria-haspopup': 'listbox',
    'class': 'my-select',
    '[class.focused]' : 'focused',
    '[class.disabled]': 'disabled',
    '[class.styled]':'!hasParentFormField',
    '[class.field-child]':'hasParentFormField',
    '[attr.tabindex]': 'disabled? 0 : -1',
    '[attr.multiple]': 'multiple',
    '(blur)':'_onBlur($event)',
    '(focus)':'_onFocus($event)'
  },
  imports: [
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    NgClass
  ],

  providers: [MY_SELECT_CONTROL_VALUE_ACCESSOR, {provide: TextFieldControl, useExisting: MySelect}]

})
export class MySelect<T = any> implements OnInit, AfterContentInit, OnDestroy, TextFieldControl<T>, ControlValueAccessor {

  private _overlay = inject(Overlay);
  private _idGenerator = inject(_IdGenerator)
  private _panelOpen: boolean = false;
  private _overlayRef: OverlayRef
  ngControl = inject(NgControl, {self: true, optional: true})!;
  private _initialized = new Subject<void>();
  private _destroy = new Subject<void>();
  controlName: string;


  /**
   * Emits whenever the component state changes and should cause the parent
   * field to update. Implemented as part of `MyFieldControl`.
   * @docs-private
   */
  readonly stateChanges = new Subject<void>();

  get host(): HTMLElement {
    return this._elementRef.nativeElement
  }

  hasValue(): boolean {
    return this.hasSelectedValue
  }

  errorState: boolean;
  protected _changeDetectorRef = inject(ChangeDetectorRef);
  readonly _elementRef = inject(ElementRef);
  protected _parentFormField = inject<MyTextField<T>>(MY_TEXT_FIELD, {optional: true});
  get hasParentFormField(): boolean { return !!this._parentFormField }
  /** Deals with the selection logic. */
  _selectionModel: SelectionModel<MyOption>;

  get hasSelectedValue(): boolean {
    return this._selectionModel.hasValue()
  }

  get selectedValues(): T | T[] {
    const selected = this._selectionModel.selected;
    if (this.multiple) {
      return selected.map(o => o.value)
    }
    return this._selectionModel.hasValue() ? selected[0].value : undefined
  }

  get selected(): MyOption | MyOption[] {
    if(this.multiple){
      return this._selectionModel.selected || [];
    }
    return this._selectionModel?.selected[0];
  }

  @Input({transform: booleanAttribute})
  multiple: boolean = false

  @Input({transform: booleanAttribute})
  disabled: boolean = false

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _placeholder: string;


  /** Value of the select control. */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    const hasAssigned = this._assignValue(newValue);

    if (hasAssigned) {
      this._onChange(newValue);
    }
  }
  private _value: any;

  @Input({transform: booleanAttribute})
  canSelectNullableOptions: boolean = false;

  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  @Input() panelClass: string | string[] | Set<string> | { [key: string]: any };

  @Input()
  id = this._idGenerator.getId('my-select-')


  /**
   * Function used to sort the values in a select in multiple mode.
   * Follows the same logic as `Array.prototype.sort`.
   */
  @Input() sortComparator: (a: MyOption, b: MyOption, options: MyOption[]) => number;


  /**
   * Function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   */
  @Input()
  get compareWith() {
    return this._compareWith;
  }
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function' && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw getMySelectNonFunctionValueError();
    }
    this._compareWith = fn;
    if (this._selectionModel) {
      // A different comparator means the selection could change.
      this._initializeSelection();
    }
  }
  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (o1: any, o2: any) => o1 === o2;



  /** Event emitted when the select panel has been toggled. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Event emitted when the select has been opened. */
  @Output('opened') readonly _openedStream: Observable<void> = this.openedChange.pipe(
    filter(o => o),
    map(() => {}),
  );

  /** Event emitted when the select has been closed. */
  @Output('closed') readonly _closedStream: Observable<void> = this.openedChange.pipe(
    filter(o => !o),
    map(() => {}),
  );

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange = new EventEmitter<MySelectChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   * @docs-private
   */
  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  /** Whether the select is focused. */
  get focused(): boolean {
    return this._focused || this._panelOpen;
  }

  private _focused = false;

  get panelOpen(): boolean {
    return this._panelOpen
  }

  /** All of the defined select options. */
  @ContentChildren(MyOption, {descendants: true})
  options: QueryList<MyOption>;

  /** User-supplied override of the trigger element. */
  @ContentChild(MY_SELECT_TRIGGER) customTrigger: MySelectTrigger;

  panelTemplate = viewChild(CdkPortal)

  trigger = viewChild<ElementRef<HTMLElement>>('triggerElement')

  /** Panel containing the select options. */
  @ViewChild('panel') panel: ElementRef;

  /** Overlay pane containing the options. */
  @ViewChild(CdkConnectedOverlay)
  protected _overlayDir: CdkConnectedOverlay;

  @ViewChild(CdkOverlayOrigin)
  _fallbackOverlayOrigin: CdkOverlayOrigin

  get preferredOverlayOrigin() {
    return this._parentFormField?.getConnectedOverlayOrigin() || this._fallbackOverlayOrigin
  }

  get empty(): boolean {
    return !this._selectionModel || this._selectionModel.isEmpty()
  }

  get triggerValue(): string {
    if (this.empty) return '';

    if (this.multiple) {
      const selectedOptions = this._selectionModel.selected
        .map(option => option.viewValue);
      return selectedOptions.join(', ');
    }
    return this._selectionModel.selected[0].viewValue;
  }

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<MyOptionSelectionChange> = defer(() => {
    const options = this.options;
    if (options) {
      return this.options.changes.pipe(startWith(options),
        switchMap(() => merge(...options.map(option => option.selectionChange))))
    }
    return this._initialized.pipe(switchMap(() => this.optionSelectionChanges))
  })


  protected _triggerHost(): HTMLElement {
    return this.trigger().nativeElement
  }

  _getOverlayWidth() {
    if(this.hasParentFormField) {
      return this._parentFormField.host.offsetWidth
    }

    return this._triggerHost().offsetWidth
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel<MyOption>(this.multiple);
    this.stateChanges.next();
  }

  ngAfterContentInit() {
    this._initialized.next();
    this._initialized.complete();

    this._selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe(event => {
      console.log(this.selectedValues)
      event.added.forEach(option => option.select());
      event.removed.forEach(option => option.deselect());
    });

    this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._initializeSelection();
    });

    // this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
    //   this.options.forEach(option => {
    //     option.selectionChange.subscribe(data => {
    //       if (option.selected) {
    //         this._selectionModel.select(option);
    //         if (!this.multiple) {
    //           this.close()
    //         }
    //       } else {
    //         this._selectionModel.deselect(option)
    //       }
    //       this._changeDetectorRef.markForCheck()
    //     })
    //   })
    //   console.log('this.options change')
    // })
  }


  ngOnDestroy() {
    this._destroy.next()
    this._destroy.complete();
    this.stateChanges.complete();
  }

  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions(): void {
    const changedOrDestroyed = merge(this.options.changes, this._destroy);

    this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed)).subscribe(event => {
      this._onSelect(event.source, event.isUserInput);

      if (event.isUserInput && !this.multiple && this._panelOpen) {
        this.close();
        this.focus();
      }
    });

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.options.map(option => option._stateChanges))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        // `_stateChanges` can fire as a result of a change in the label's DOM value which may
        // be the result of an expression changing. We have to use `detectChanges` in order
        // to avoid "changed after checked" errors (see #14793).
        this._changeDetectorRef.detectChanges();
        this.stateChanges.next();
      });
  }



  /** Invoked when an option is clicked. */
  private _onSelect(option: MyOption, isUserInput: boolean): void {
    const wasSelected = this._selectionModel.isSelected(option);

    if (!this.canSelectNullableOptions && option.value == null && !this.multiple) {
      option.deselect();
      this._selectionModel.clear();

      if (this.value != null) {
        this._propagateChanges(option.value);
      }
    } else {
      if (wasSelected !== option.selected) {
        option.selected
          ? this._selectionModel.select(option)
          : this._selectionModel.deselect(option);
      }

      if (isUserInput) {
       // this._keyManager.setActiveItem(option);
      }

      if (this.multiple) {
        this._sortValues();

        if (isUserInput) {
          // In case the user selected the option with their mouse, we
          // want to restore focus back to the trigger, in order to
          // prevent the select keyboard controls from clashing with
          // the ones from `mat-option`.
          this.focus();
        }
      }
    }

    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }

    this.stateChanges.next();
  }

  /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
  private _selectOptionByValue(value: any): MyOption | undefined {
    const correspondingOption = this.options.find((option: MyOption) => {
      // Skip options that are already in the model. This allows us to handle cases
      // where the same primitive value is selected multiple times.
      if (this._selectionModel.isSelected(option)) {
        return false;
      }

      try {
        // Treat null as a special reset value.
        return (
          (option.value != null || this.canSelectNullableOptions) &&
          this._compareWith(option.value, value)
        );
      } catch (error) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
          // Notify developers of errors in their comparator.
          console.warn(error);
        }
        return false;
      }
    });

    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (this.ngControl) {
        this._value = this.ngControl.value;
      }

      this._setSelectionByValue(this._value);
      this.stateChanges.next();
    });
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  private _setSelectionByValue(value: any | any[]): void {
    this.options.forEach(option => option.setInactiveStyles());
    this._selectionModel.clear();

    if (this.multiple && value) {
      if (!Array.isArray(value) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw getMySelectNonArrayValueError();
      }

      value.forEach((currentValue: any) => this._selectOptionByValue(currentValue));
      this._sortValues();
    } else {
      const correspondingOption = this._selectOptionByValue(value);

      // Shift focus to the active item. Note that we shouldn't do this in multiple
      // mode, because we don't know what option the user interacted with last.
      // if (correspondingOption) {
      //   this._keyManager.updateActiveItem(correspondingOption);
      // } else if (!this.panelOpen) {
      //   // Otherwise reset the highlighted option. Note that we only want to do this while
      //   // closed, because doing it while open can shift the user's focus unnecessarily.
      //   this._keyManager.updateActiveItem(-1);
      // }
    }

    this._changeDetectorRef.markForCheck();
  }

  private _assignValue(newValue: any): boolean {
    let hasAssigned = false;
    if(this._value != newValue){
      this._value = newValue;
      hasAssigned = true;
    } else if(this.multiple && Array.isArray(newValue)){
      this._value = newValue;
      hasAssigned = true;
    }

    if(hasAssigned && this.options){
      this._setSelectionByValue(newValue);
    }
    return hasAssigned;
  }


  private get _canOpen(): boolean {
    return !this._panelOpen && !this.disabled && this.options.length > 0
  }

  public toggle(): void {
    if(this.panelOpen) {
      this.close();
    }else {
      this.open();
    }
  }
  public open(): void {
    if(!this._canOpen) return;

    this._panelOpen = true;
    this.stateChanges.next()
    this._changeDetectorRef.markForCheck()
  }

  close() {
    if (!this._panelOpen)
      return
    this._panelOpen = false;
    this._onTouched()
    this.stateChanges.next()
    this._changeDetectorRef.markForCheck()
  }

  /** Focuses the select element. */
  focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  /** Sorts the selected values in the selected based on their order in the panel. */
  private _sortValues() {
    if (this.multiple) {
      const options = this.options.toArray();

      this._selectionModel.sort((a, b) => {
        return this.sortComparator
          ? this.sortComparator(a, b, options)
          : options.indexOf(a) - options.indexOf(b);
      });
      this.stateChanges.next();
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any;

    if (this.multiple) {
      valueToEmit = (this.selected as MyOption[]).map(option => option.value);
    } else {
      valueToEmit = this.selected ? (this.selected as MyOption).value : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(this._getChangeEvent(valueToEmit));
    this._changeDetectorRef.markForCheck();
  }

  _triggerClick() {
  }

  _onKeydown(event: KeyboardEvent) {

  }

  _onBlur(event) {
    this._focused = false;

    if(!this.disabled){
      this._onTouched();
      this._changeDetectorRef.markForCheck()
      this.stateChanges.next()
    }
  }

  _onFocus(event) {
    if (!this.disabled) {
      this._focused = true;
      this.stateChanges.next();
    }
  }

  _onOverlayKeydown(event: KeyboardEvent) {
    if (event.key === ' ' && !hasModifierKey(event)) {
      event.preventDefault()
      this.close()
    }
  }

  /** Creates a change event object that should be emitted by the select. */
  private _getChangeEvent(value: any) {
    return new MySelectChange(this, value);
  }

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => {
  };

  /** `View -> model callback called when select has been touched` */
  _onTouched = () => {
  };

  writeValue(obj: any): void {
    this._assignValue(obj);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }

  /**
   * This position config ensures that the top "start" corner of the overlay
   * is aligned with with the top "start" of the origin by default (overlapping
   * the trigger completely). If the panel cannot fit below the trigger, it
   * will fall back to a position above the trigger.
   */
  _positions: ConnectedPosition[] = [
    {
      originX: 'start',
      overlayX: 'start',
      originY: 'bottom',
      overlayY: 'top',
      offsetY: -4
    },
    {
      originX: 'end',
      overlayX: 'end',
      originY: 'bottom',
      overlayY: 'top',
      offsetY: 4
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetX: -2,
      panelClass: 'my-select-panel-above',
    },
    {
      originX: 'end',
      overlayX: 'end',
      originY: 'top',
      overlayY: 'bottom',
      offsetY: -8,
      panelClass: 'my-select-panel-above',
    },
  ];

  protected _getScrollStrategy() {
    return this._overlay.scrollStrategies.reposition();
  }

}



