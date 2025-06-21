import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: 'textarea[MyTextFieldInput], input[MyTextFieldInput]',
  standalone: true,
  host: {
    'class': 'my-text-field-input',
    '[attr.disabled]':'disabled'
  }
})
export class TextFieldInput {
  @Input()
  disabled: boolean = false;

  constructor(private _elementRef: ElementRef<HTMLInputElement>) {}


  get host() {
    return this._elementRef.nativeElement;
  }

}
