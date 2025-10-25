import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, inject,
  Input, OnDestroy,
  Output, signal, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {_IdGenerator, FocusOrigin} from '@angular/cdk/a11y';
import {hasModifierKey} from '@angular/cdk/keycodes';
import {MY_OPTION_PARENT_COMPONENT, MyOptionParentComponent} from './option-parent';
import {MY_OPTION_GROUP, MyOptionGroup} from './option-group';


/** Event object emitted by MatOption when selected or deselected. */
export class MyOptionSelectionChange<T = any> {
  constructor(
    /** Reference to the option that emitted the event. */
    public source: MyOption<T>,
    /** Whether the change in the option's value was a result of a user action. */
    public isUserInput = false,
  ) {
  }
}

@Component({
  templateUrl: 'option.html',
  styleUrl: 'option.scss',
  selector: 'MySelectOption, [MySelectOption]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  host: {
    'class': 'my-select-option',
    '[class.selected]': 'selected',
    '[class.disabled]': 'disabled',
    '[class.active]': 'active',
    '[class.multiple]': 'multiple',
    '[attr.aria-selected]': 'selected',
    '[attr.aria-disabled]': 'disabled.toString()',

    'role': 'option',
    '(click)': '_selectViaInteraction()',
    '(keydown)': '_handleKeydown($event)',
  }
})
export class MyOption<T = any> implements OnDestroy {
  private _element = inject<ElementRef<HTMLElement>>(ElementRef);
  private _parent = inject<MyOptionParentComponent>(MY_OPTION_PARENT_COMPONENT, {optional: true});
  group = inject<MyOptionGroup>(MY_OPTION_GROUP, {optional: true});


  private _selected = false;
  private _active = false;
  private _mostRecentViewValue = '';

  /** Whether the wrapping component is in multiple selection mode. */
  get multiple() {
    return this._parent && this._parent.multiple;
  }

  @Input()
  set selected(value: boolean) {
    if (value != this._selected) {
      this._selected = value;
    }
  }

  get selected(): boolean { return this._selected; }

  /**
   * Whether or not the option is currently active and ready to be selected.
   * An active option displays styles as if it is focused, but the
   * focus is actually retained somewhere else. This comes in handy
   * for components like autocomplete where focus must remain on the input.
   */
  get active(): boolean {
    return this._active;
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    return this.viewValue;
  }

  /**
   * The displayed value of the option. It is necessary to show the selected option in the
   * select's trigger.
   */
  get viewValue(): string {
    return (this._text?.nativeElement.textContent || '').trim();
  }


  @Input()
  value: any

  /** The unique ID of the option. */
  @Input() id: string = inject(_IdGenerator).getId('my-option-');

  /** Whether the option is disabled. */
  @Input({transform: booleanAttribute})
  get disabled(): boolean {
    return (this.group && this.group.disabled) || this._disabled();
  }
  set disabled(value: boolean) {
    this._disabled.set(value);
  }
  private _disabled = signal(false);

  @Output()
  private selectionChange = new EventEmitter<MyOptionSelectionChange<T>>();

  /** Element containing the option's text. */
  @ViewChild('text', {static: true}) _text: ElementRef<HTMLElement> | undefined;

  /** Emits when the state of the option changes and any parents have to be notified. */
  readonly _stateChanges = new Subject<void>();

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }


  /** Selects the option. */
  select(emitEvent = true): void {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();

      if (emitEvent) {
        this._emitSelectionChangeEvent();
      }
    }
  }

  /** Deselects the option. */
  deselect(emitEvent = true): void {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();

      if (emitEvent) {
        this._emitSelectionChangeEvent();
      }
    }
  }

  /** Sets focus onto this option. */
  focus(_origin?: FocusOrigin, options?: FocusOptions): void {
    // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
    // use `MatOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
    const element = this._getHostElement();

    if (typeof element.focus === 'function') {
      element.focus(options);
    }
  }
  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setActiveStyles(): void {
    if (!this._active) {
      this._active = true;
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setInactiveStyles(): void {
    if (this._active) {
      this._active = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Ensures the option is selected when activated from the keyboard. */
  _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || event.key === ' ') && !hasModifierKey(event)) {
      this._selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /**
   * `Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.`
   */
  _selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = this.multiple ? !this._selected : true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  /** Gets the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  ngAfterViewChecked() {
    // Since parent components could be using the option's label to display the selected values
    // (e.g. `MySelect`) and they don't have a way of knowing if the option's label has changed
    // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
    // relatively cheap, however we still limit them only to selected options in order to avoid
    // hitting the DOM too often.
    if (this._selected) {
      const viewValue = this.viewValue;

      if (viewValue !== this._mostRecentViewValue) {
        if (this._mostRecentViewValue) {
          this._stateChanges.next();
        }

        this._mostRecentViewValue = viewValue;
      }
    }
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.selectionChange.emit(new MyOptionSelectionChange<T>(this, isUserInput));
  }


}
