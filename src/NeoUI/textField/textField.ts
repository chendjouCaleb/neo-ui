import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import {MyLabel} from './label';
import {TEXT_FIELD_DEFAULT_OPTIONS, TextFieldAppearance, TextFieldDefaultOptions} from './textFieldOptions';
import {MyOptionGroup} from '../select/option';
import {TextFieldControl} from './textFieldControl';
import {MyTextFieldLeadingContent} from './textField-leadingContent';
import {MyTextFieldTrailingContent} from './textField-trailingContent';

export const MY_TEXT_FIELD = new InjectionToken<MyOptionGroup>('MyTextField');

@Component({
  selector: 'TextField, MyTextField',
  templateUrl: 'textField.html',
  styleUrls: ['textField.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-text-field',
    '[class.disabled]': 'disabled',
    '[class.focused]': 'focused',
    '[class.error]': 'isError',
  },
  providers: [ {provide: MY_TEXT_FIELD, useExisting: TextField} ]
})
export class TextField<T> implements AfterContentInit, AfterViewInit {
  private _initialized: boolean = false;

  private _focused: boolean;
  get focused(): boolean {
    return this._focused
  }

 get disabled(): boolean {
    return this.inputField.disabled
  }


  @Input()
  get isError(): boolean {
    return this._isError
  }

  set isError(value: boolean) {

    if (this._initialized) {
      if (this.contentLabel) {
        this.contentLabel.error = value;
      }
      // this.inputField.errorState = value;
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

  @ContentChild(forwardRef(() => MyLabel))
  contentLabel: MyLabel;

  @ContentChild(forwardRef(() => TextFieldControl))
  inputField: TextFieldControl<T>;

  @ContentChild(forwardRef(() => MyTextFieldLeadingContent))
  leadingContent: MyTextFieldLeadingContent;

  @ContentChild(forwardRef(() => MyTextFieldTrailingContent))
  trailingContent: MyTextFieldTrailingContent;

  get hasLeadingContent(): boolean { return !!this.leadingContent }
  get hasTrailingContent(): boolean { return !!this.trailingContent }



  constructor(private _elementRef: ElementRef<HTMLElement>,
              private changeDetectorRef: ChangeDetectorRef,
              @Optional() @Inject(TEXT_FIELD_DEFAULT_OPTIONS) private _defaultOptions: TextFieldDefaultOptions
  ) {
  }

  ngAfterViewInit(): void {
    this._initialized = true;



    Promise.resolve().then(() => {
      this.isError = this._isError;
    });
  }

  ngAfterContentInit(): void {
    if (!this.inputField) {
      throw new Error('The MyTextField must contains a MyTextInputField');
    }

    this.inputField.stateChanges.subscribe(() => {
      this._focused = this.inputField.focused
      this._updateLabelFocusState()
      this.changeDetectorRef.markForCheck()
    })

    this._updateLabelFocusState()
    this.changeDetectorRef.markForCheck();
  }


  ngOnDestroy(): void {
    this.inputField.host.removeEventListener('focus', this._inputFocusEvent);
    this.inputField.host.removeEventListener('blur', this._inputBlurEvent);
  }

  private _inputFocusEvent = () => {
    this._focused = true
  };
  private _inputBlurEvent = () => {
    this._focused = false;

  }

  hasLabel(): boolean { return !!this.contentLabel; }



  _updateLabelFocusState(){
    if(!this.hasLabel()) return;
    this.contentLabel.focused = this._focused;
    this.contentLabel.floating = this.inputField.hasValue() || this.inputField.focused;
  }


  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  /**
   * Gets an ElementRef for the element that a overlay attached to the form field
   * should be positioned relative to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return  this._elementRef;
  }

}
