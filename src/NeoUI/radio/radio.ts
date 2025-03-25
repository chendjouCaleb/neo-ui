import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, computed, effect,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Inject,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output, SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FocusMonitor} from '@angular/cdk/a11y';


import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {MY_RADIO_DEFAULT_OPTIONS, MyRadioDefaultOptions} from './radio-options';
import {Subject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

let nextUniqueId = 0;

/** Change event object emitted by MatRadio and MatRadioGroup. */
export class MyRadioChange {
  /**
   * The constructor.
   * @param source he MatRadioButton that emits the change event.
   * @param value The value of the MatRadioButton.
   */
  constructor(public source: MyRadio, public value: any) {
  }
}

/**
 * Provider Expression that allows Radio to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const MY_RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MyRadio),
  multi: true
};

@Component({
  templateUrl: 'radio.html',
  styleUrl: 'radio.scss',
  selector: 'MyRadio, my-radio',
  host: {
    'class': 'my-radio',
    '[class.checked]': 'checked',
    '[class.disabled]': 'disabled',

    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[attr.id]': 'id',
    '[attr.disabled]': 'disabled',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    '[attr.aria-describedby]': 'ariaDescribedby',
    '[attr.aria-label]': 'ariaLabel'
  },
  //changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [MY_RADIO_CONTROL_VALUE_ACCESSOR]
})

/**
 * The radio input component.
 * Code inspired by Angular Material.
 * Design inspired by Microsoft Fabric.
 *
 * @author Chendjou Caleb deGrace
 * @version 1.
 */
export class MyRadio implements AfterContentInit, OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  /**
   * ID of the native input element inside `<MsRadioInput>`
   * This Id should be different to id property which is used for the MsRadioInput
   */
  @Input()
  inputId: string = '';


  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input() ariaLabel: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input() ariaLabelledby: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input() ariaDescribedby: string;

  /** Whether this radio button is disabled. */
  @Input()
  disabled: boolean = false;

  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  @Output()
  readonly change: EventEmitter<MyRadioChange> = new EventEmitter<MyRadioChange>();

  readonly onactivate = new Subject<boolean>();

  @ViewChild('thumb')
  thumb: ElementRef<HTMLElement>;

  /**
   * Tells whether the component is initialised.
   */
  private _isInitialized: boolean = false;

  private _uniqueId: string = `ms-radio-${++nextUniqueId}`;


  /** The unique ID for the radio button. */
  @Input()
  id: string = this._uniqueId;

  @Input()
  name: string = this._uniqueId;

  /** Whether this radio is checked. */
  @Input()
  get checked(): boolean { return this._checked; }

  set checked(value: boolean) {
    value = coerceBooleanProperty(value);
    if (value) {
      this.onactivate.next(value);
    }
    this._checked = value;

    this._changeDetector.markForCheck();
  }
  private _checked: boolean = false;


  /** Value assigned to this radio. */
  @Input()
  get value(): any { return this._value; }

  set value(value: any) { this._value = value;}

  private _value: any = null;

  @ViewChild('nativeInput')
  nativeInput: ElementRef<HTMLInputElement>

  getInputChecked = computed(() => {
    return this.nativeInput.nativeElement.checked
  })

  /**
   * Called when the radio is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  private _onTouched: () => any = () => {
  };
  private _controlValueAccessorChangeFn: (value: any) => void = () => {
  };

  private _touched: boolean = false;

  constructor(public _elementRef: ElementRef<HTMLElement>,
              private _changeDetector: ChangeDetectorRef,
              private _focusMonitor: FocusMonitor,
              @Optional() @Inject(MY_RADIO_DEFAULT_OPTIONS)
              private _providerOverride?: MyRadioDefaultOptions
  ) {
    this._focusMonitor.monitor(_elementRef, false).subscribe(focusOrigin => {
      if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => {
          this._onTouched();
          this._touched = true;
          _changeDetector.markForCheck();
        });
      }
    });


  }


  ngOnInit() {
  }


  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  @HostListener('click')
  onClick() {

    if (this.disabled) {
      return;
    }
    if (!this._checked) {
      this.checked = true;
      this._emitChangeEvent();
    }
  }

  _nativeInputChange() {
    this._checked = this.nativeInput.nativeElement.checked
    this._emitChangeEvent()
    console.log(`change event: NativeInputChecked:${this.getInputChecked}`)
  }


  ngAfterContentInit(): void {
    this._isInitialized = true;
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }


  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  get changeDetector(): ChangeDetectorRef {
    return this._changeDetector;
  }


  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetector.markForCheck();
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    this.change.emit(new MyRadioChange(this, this._value));
  }


  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.checked = !!value;
  }
}
