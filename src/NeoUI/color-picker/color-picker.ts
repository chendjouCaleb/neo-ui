import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  viewChild,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {capitalizeFirstLetter, FluentPaletteColor} from '../helpers';
import {MaterialIcon} from '../material-icon';
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition, Overlay} from '@angular/cdk/overlay';
import {MyColorPickerThumb} from './color-picker-thumb';
import {MY_TEXT_FIELD, TextField} from '../textField';
import {MyColorPickerPanel} from './panel';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TextFieldControl} from '../textField/textFieldControl';
import {Subject} from 'rxjs';
import {fluentPaletteColorIntlFr} from '../helpers/fluent-color-palette-intl.fr';


export const MY_COLOR_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MyColorPicker),
  multi: true
};

@Component({
  selector: 'MyColorPicker',
  templateUrl: 'color-picker.html',
  styleUrl: 'color-picker.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MaterialIcon,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    MyColorPickerThumb,
    MyColorPickerPanel
  ],
  providers: [MY_COLOR_PICKER_CONTROL_VALUE_ACCESSOR,
    {provide: TextFieldControl, useExisting: MyColorPicker}
  ],
  host: {
    'role': 'combobox',
    'aria-haspopup': 'listbox',
    'class': 'my-select',
    '[class.focused]': 'focused',
    '[class.disabled]': 'disabled',
    '[class.styled]': '!hasParentFormField',
    '[class.field-child]': 'hasParentFormField',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '(blur)': '_onBlur($event)',
    '(focus)': '_onFocus($event)'
  },
})
export class MyColorPicker implements AfterViewInit, OnDestroy, OnInit, ControlValueAccessor, TextFieldControl<FluentPaletteColor> {


  private _overlay = inject(Overlay);
  protected _changeDetectorRef = inject(ChangeDetectorRef);
  readonly _elementRef = inject(ElementRef);
  protected _parentFormField = inject<TextField<FluentPaletteColor>>(MY_TEXT_FIELD, {optional: true});
  private _initialized = new Subject<void>();
  private _destroy = new Subject<void>();


  get hasParentFormField(): boolean {
    return !!this._parentFormField
  }

  selected: FluentPaletteColor | undefined

  get isEmpty(): boolean {
    return !this.selected;
  }

  @Input()
  placeholder: string = '';


  @Input()
  disabled: boolean

  @Input()
  isError: boolean

  @Output()
  onChange = new EventEmitter<FluentPaletteColor>();

  /**
   * Emits whenever the component state changes and should cause the parent
   * field to update. Implemented as part of `MyFieldControl`.
   * @docs-private
   */
  readonly stateChanges = new Subject<void>();

  @ViewChild(MyColorPickerPanel)
  colorPickerPanel: MyColorPickerPanel

  @ViewChild(CdkOverlayOrigin)
  _fallbackOverlayOrigin: CdkOverlayOrigin

  trigger = viewChild<ElementRef<HTMLElement>>('triggerElement')

  /** Ideal origin for the overlay panel. */
  _overlayOrigin: CdkOverlayOrigin | ElementRef | undefined;

  _getOverlayWidth() {
    if (this.hasParentFormField) {
      return this._parentFormField.host.offsetWidth
    }

    return this._triggerHost().offsetWidth
  }


  ngOnInit() {
    this.stateChanges.next()
  }

  ngAfterViewInit() {
    this._initialized.next();
    this._initialized.complete();
    this.stateChanges.next()
  }

  ngOnDestroy() {
    this._destroy.next()
    this._destroy.complete()
    this.stateChanges.complete();
  }

  get value(): FluentPaletteColor {
    return this.selected
  };

  get empty(): boolean {
    return this.isEmpty
  };

  controlName: string;

  get host(): HTMLElement {
    return this._elementRef.nativeElement
  }

  hasValue(): boolean {
    return !!this.selected
  }

  get errorState(): boolean {
    return this.isError
  }

  controlType?: string = 'color-picker';

  _panelValueChange(color: FluentPaletteColor) {
    this.selected = color
    this.onChange.emit(color);
    this._onChange(color)
    this.close()
  }


  private _panelOpen: boolean = false;
  get panelOpen(): boolean {
    return this._panelOpen
  }

  open() {
    this._overlayOrigin = this._parentFormField?.getConnectedOverlayOrigin() || this._fallbackOverlayOrigin

    this._panelOpen = true
    this.stateChanges.next()
    this._changeDetectorRef.markForCheck()
  }

  close() {
    this._panelOpen = false;
    this.stateChanges.next();
    this._onTouched()
    this._changeDetectorRef.markForCheck()
  }

  private _focused: boolean = false;
  get focused(): boolean {
    return this._focused;
  }

  _onBlur(event) {
    this._focused = true;
    this.stateChanges.next();
    this._changeDetectorRef.markForCheck();
    this._onTouched()
  }

  _onFocus(event) {
    this._focused = false;
    this.stateChanges.next();
    this._changeDetectorRef.markForCheck();
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
    this.disabled = isDisabled
  }

  _assignValue(color: FluentPaletteColor) {
    this.selected = color
    this._changeDetectorRef.markForCheck()
  }

  protected _getScrollStrategy() {
    return this._overlay.scrollStrategies.reposition();
  }

  protected _triggerHost(): HTMLElement {
    return this.trigger().nativeElement
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
      offsetY: 4
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

  _getColorName(palette: FluentPaletteColor): string {
    const name = fluentPaletteColorIntlFr[palette];
    if (name) {
      return capitalizeFirstLetter(name);
    }
    return ''
  }
}
