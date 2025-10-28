import {
  AfterContentInit, AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild, ElementRef,
  forwardRef, Inject, InjectionToken, Input, Optional,
  ViewEncapsulation
} from '@angular/core';
import {TextFieldLabel} from './textFieldLabel';
import {TextFieldInput} from './textFieldInput';
import {MY_TEXT_FIELD_DEFAULT_OPTIONS, MyTextFieldDefaultOptions, TextFieldAppearance} from './textFieldOptions';
import {MyOptionGroup} from '../select/option';
import {TextFieldControl} from './textFieldControl';

export const MY_TEXT_FIELD = new InjectionToken<MyOptionGroup>('MyTextField');

@Component({
  selector: 'TextField, MyTextField',
  templateUrl: 'textField.html',
  styleUrls: ['textField.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'my-text-field',
    '[class.disabled]': 'disabled',
    '[class.focused]': 'focused',
    '[class.error]': 'isError',
  },
  providers: [ {provide: MY_TEXT_FIELD, useExisting: MyTextField} ]
})
export class MyTextField implements AfterContentInit, AfterViewInit {
  private _initialized: boolean = false;

  private _focused: boolean;
  get focused(): boolean {
    return this._focused
  }

  @Input()
  get disabled(): boolean {
    return this._disabled
  }

  set disabled(value: boolean) {

    if (this._initialized) {
      if (this.contentLabel) {
        this.contentLabel.disabled = value;
      }
      this.inputField.disabled = value;
    }
    this._disabled = value;
  }

  private _disabled: boolean;

  @Input()
  get isError(): boolean {
    return this._isError
  }

  set isError(value: boolean) {

    if (this._initialized) {
      if (this.contentLabel) {
        this.contentLabel.error = value;
      }
      this.inputField.error = value;
    }
    this._isError = value;
  }

  private _isError: boolean;

  @Input()
  appearance: TextFieldAppearance = 'fill'


  private _floatingLabel: boolean = false
  get floatingLabel(): boolean {
    return this.focused || (this.inputField.hasValue())
  }

  @ContentChild(forwardRef(() => TextFieldLabel))
  contentLabel: TextFieldLabel;

  @ContentChild(forwardRef(() => TextFieldControl))
  inputField: TextFieldControl;




  constructor(private _elementRef: ElementRef<HTMLElement>,
              private changeDetectorRef: ChangeDetectorRef,
              @Optional() @Inject(MY_TEXT_FIELD_DEFAULT_OPTIONS) private _defaultOptions: MyTextFieldDefaultOptions
  ) {
  }

  ngAfterViewInit(): void {
    this._initialized = true;

    Promise.resolve().then(() => {
      this.disabled = this._disabled;
      this.isError = this._isError;
    });
  }

  ngAfterContentInit(): void {
    if (!this.inputField) {
      throw new Error('The MyTextField must contains a MyTextInputField');
    }

    if (!this.contentLabel) {
      throw new Error('The MyTextField must contains a MyTextFieldLabel');
    }
    this.inputField.host.addEventListener('focus', this._inputFocusEvent);
    this.inputField.host.addEventListener('blur', this._inputBlurEvent);

    if (this.inputField.hasValue()) {
      this.contentLabel.floating = true;
    }

    this.changeDetectorRef.markForCheck();
  }


  ngOnDestroy(): void {
    this.inputField.host.removeEventListener('focus', this._inputFocusEvent);
    this.inputField.host.removeEventListener('blur', this._inputBlurEvent);
  }

  private _inputFocusEvent = () => {
    this._focused = true
    this.contentLabel.focused = true
    this.contentLabel.floating = true;
  };
  private _inputBlurEvent = () => {
    this._focused = false;
    this.contentLabel.focused = false;
    if (!this.inputField.hasValue()) {
      this.contentLabel.floating = false
    }

  }


  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

}
