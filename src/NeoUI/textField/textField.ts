import {
  AfterContentInit, AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild, ElementRef,
  forwardRef, Input,
  ViewEncapsulation
} from '@angular/core';
import {TextFieldLabel} from './textFieldLabel';
import {TextFieldInput} from './textFieldInput';
import {error} from 'ng-packagr/lib/utils/log';

@Component({
  selector: 'TextField, MyTextField',
  templateUrl: 'textField.html',
  styleUrls: [ 'textField.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'my-text-field',
    '[class.disabled]': 'disabled',
    '[class.focused]': 'focused',
    '[class.error]': 'isError',
  }
})
export class TextField implements AfterContentInit, AfterViewInit {
  private _initialized: boolean = false;

  private _focused: boolean;
  get focused(): boolean { return this._focused }



  @Input()
  get disabled(): boolean { return this._disabled }
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
  get isError(): boolean { return this._isError }
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


  private _floatingLabel: boolean = false
  get floatingLabel(): boolean {
    return this.focused ||  (this.inputFieldHost && this.inputFieldHost.value !== "")
  }

  @ContentChild(forwardRef(() => TextFieldLabel))
  contentLabel: TextFieldLabel;

  @ContentChild(forwardRef(() => TextFieldInput))
  inputField: TextFieldInput;


  constructor(private _elementRef: ElementRef<HTMLElement>,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._initialized = true;

    Promise.resolve().then(() => {
      this.disabled = this._disabled;
      this.isError = this._isError;
    });
  }

  ngAfterContentInit(): void {
    if(!this.inputField) {
      throw new Error('The MyTextField must contains a MyTextInputField');
    }
    this.inputField.host.addEventListener('focus', this._inputFocusEvent);
    this.inputField.host.addEventListener('blur', this._inputBlurEvent);

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
    console.log("focus")
  };
  private _inputBlurEvent = () => {
    this._focused = false;
    this.contentLabel.focused = false;
    if(this.inputFieldHost.value === '') {
      this.contentLabel.floating = false
    }

  }

  get inputFieldHost(): HTMLInputElement {
    return this.inputField.host;
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

}
