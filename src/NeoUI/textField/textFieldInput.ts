import {Directive, ElementRef, Input} from '@angular/core';
import {TextFieldControl} from './textFieldControl';

@Directive({
  selector: 'textarea[MyTextFieldInput], input[MyTextFieldInput]',
  standalone: true,
  host: {
    'class': 'my-text-field-input',
    '[attr.disabled]': 'disabled',
    '[class.error]': 'error'
  },
  providers: [{provide: TextFieldControl, useExisting: TextFieldInput}]
})
export class TextFieldInput implements TextFieldControl {
  @Input()
  disabled: boolean = false;

  @Input()
  error: boolean = false

  constructor(private _elementRef: ElementRef<HTMLInputElement>) {
  }

  controlName: string = 'my-input';

  hasValue(): boolean {
    return !!this.host.value
  }


  get host():HTMLInputElement {
    return this._elementRef.nativeElement;
  }

}
