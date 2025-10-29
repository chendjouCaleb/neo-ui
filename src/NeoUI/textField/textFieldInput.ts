import {booleanAttribute, Directive, ElementRef, Input} from '@angular/core';
import {TextFieldControl} from './textFieldControl';
import {Subject} from "rxjs";

@Directive({
  selector: 'textarea[MyInput], input[MyInput]',
  standalone: true,
  host: {
    'class': 'my-text-field-input',
    '[disabled]': 'disabled',
    '[class.error]': 'errorState',
    '(focus)':'_onFocus()',
    '(blur)' : '_onBlur()'
  },
  providers: [{provide: TextFieldControl, useExisting: TextFieldInput}]
})
export class TextFieldInput implements TextFieldControl<string> {
  @Input({transform: booleanAttribute})
  set disabled(newValue: boolean){
    this._disabled = newValue;
    this.stateChanges.next()
  }

  get disabled(): boolean { return this._disabled }
  private _disabled: boolean = false;

  @Input()
  errorState: boolean = false

  constructor(private _elementRef: ElementRef<HTMLInputElement>) {
  }

  get value(): string {
    return this.host.value
  }

  stateChanges: Subject<void> = new Subject<void>();

  get placeholder(): string {
    return this.host.placeholder
  }

  private _focused: boolean;
  get focused(): boolean { return this._focused }
  get empty(): boolean { return !this.value }
  readonly controlType = 'my-input'

  controlName: string = 'my-input';

  hasValue(): boolean {
    return !!this.host.value
  }

  get host(): HTMLInputElement {
    return this._elementRef.nativeElement;
  }

  _onFocus(){
    this._focused = true;
    this.stateChanges.next();
  }

  _onBlur() {
    this._focused = false;
    this.stateChanges.next();
  }
}
