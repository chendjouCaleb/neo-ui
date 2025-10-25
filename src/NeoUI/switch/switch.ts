import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  forwardRef, Inject,
  Input, Optional,
  Output, ViewChild,
  ViewEncapsulation,
  DOCUMENT
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';

import {MY_SWITCH_DEFAULT_OPTIONS, MySwitchDefaultOptions} from './switch-options';


// Increasing integer for generating unique ids for switch components.
let nextUniqueId = 0;


/**
 * Provider Expression that allows Switch to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const MY_SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MySwitch),
  multi: true
};


/**
 * Change event object emitted by MySwitch.
 */
export class MySwitchChange {
  /**
   * Ctor
   * @param source The source MySwitch of the event.
   * @param nativeEvent The native html event that triggered event
   * @param checked The new `checked` value of the switch.
   */
  constructor(public source: MySwitch, public nativeEvent: Event, public checked: boolean) {
  }
}

const CHECKMARK_PATH = 'M13.86 3.66a.5.5 0 01-.02.7l-7.93 7.48a.6.6 0 01-.84-.02L2.4 9.1a.5.5 0 01.72-.7l2.4 2.44 7.65-7.2a.5.5 0 01.7.02z';


@Component({
  templateUrl: 'switch.html',
  styleUrl: 'switch.scss',
  selector: 'MySwitch',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [MY_SWITCH_CONTROL_VALUE_ACCESSOR],
  host: {
    'class': 'my-switch',
    '[class.my-checked]': 'checked',
    '[class.my-indeterminate]': 'indeterminate',
    '[class.my-disabled]': 'disabled',

    // Needs to be -1 so the `focus` event still fires.
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[attr.id]': 'getHostId()',
    '[attr.disabled]': 'disabled',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-checked]': '_getAriaChecked()',
    '[attr.aria-disabled]': 'disabled',
    '[attr.role]': 'role',
    '(click)': '_onClick($event)'
  }

})
export class MySwitch {



  private _uniqueId: string = `ms-switch-${++nextUniqueId}`;

  /**
   * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
   * take precedence so this may be omitted.
   */
  @Input()
  ariaLabel: string = '';

  /**
   * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
   */
  @Input()
  ariaLabelledby: string | null = null;

  @Input()
  id: string = this._uniqueId;
  getHostId(): string { return `${this.id}_host`}

  /** Whether this switch button is disabled. */
  @Input()
  disabled: boolean = false;

  @Input()
  /** Whether the switch is required. */
  public required: boolean;

  /** The value attribute of the native input element */
  @Input()
  value: any;

  @Input()
  set checked(state: boolean) {
    this._checked = state
  }
  get checked(): boolean { return this._checked }
  private _checked: boolean = false

  /**
   * Whether the switch is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a switch with three states, e.g. a switch that represents a nested list of
   * checkable items. Note that whenever switch is manually clicked, indeterminate is immediately
   * set to false.
   */
  @Input()
  set indeterminate(state: boolean) {
    this._indeterminate = state
  }
  get indeterminate(): boolean { return this._indeterminate }
  private _indeterminate: boolean = false

  /** Event emitted when the switch's `checked` value changes. */
    // tslint:disable-next-line:no-output-native
  @Output()
  readonly change: EventEmitter<MySwitchChange> = new EventEmitter<MySwitchChange>();

  /** Event emitted when the switch's `indeterminate` value changes. */
  @Output() readonly indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  readonly role: string = 'switch';

  @ViewChild('nativeInput')
  _nativeInput: ElementRef<HTMLInputElement>

  /**
   * Called when the switch is blurred. Needed to properly implement ControlValueAccessor.
   * @docs-private
   */
  private _onTouched: () => any = () => {
  };
  private _controlValueAccessorChangeFn: (value: any) => void = () => {
  };

  get touched(): boolean {return this._touched;}
  private _touched: boolean = false;
  get dirty(): boolean {return this._dirty;}
  private _dirty: boolean = false;

  constructor(public _elementRef: ElementRef<HTMLElement>,
              private _changeDetectorRef: ChangeDetectorRef,
              private _focusMonitor: FocusMonitor,
              @Inject(DOCUMENT) private _document: any,
              @Optional() @Inject(MY_SWITCH_DEFAULT_OPTIONS) private _defaultOptions: MySwitchDefaultOptions) {

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
          _changeDetectorRef.markForCheck();
        });
      }
    });
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(event: Event): void {
    this.change.emit(new MySwitchChange(this, event, this._checked));
    this._controlValueAccessorChangeFn(this.checked);
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

  _getAriaChecked(): 'true' | 'false' | 'mixed' {
    return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
  }

  _onClick(event ) {
    this._checked = !this._nativeInput.nativeElement.checked
    this._emitChangeEvent(event)
  }

  _nativeInputChange(event) {
    this.checked = this._nativeInput.nativeElement.checked
    this._emitChangeEvent(event)
  }
}
