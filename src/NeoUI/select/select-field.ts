import {
  ChangeDetectionStrategy,
  Component,
  ContentChild, ElementRef, EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation
} from "@angular/core";
import {TextFieldLabel} from '../textField';
import {
  LucideAngularModule,
  ChevronDownIcon
} from 'lucide-angular';

@Component({
  selector: 'SelectField',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'select-field.html',
  styleUrl: 'select.scss',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'my-select-field',
    '[class.disabled]': 'disabled',
    '[class.focused]': 'focused',
    '[attr.tabindex]': 'disabled? -1 : 0',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()'
  }

})
export class SelectField {
  private _initialized: boolean = false;
  chevronDownIcon = ChevronDownIcon

  private _focused: boolean;
  get focused(): boolean { return this._focused }

  private _disabled: boolean;
  get disabled(): boolean { return this._disabled }
  set disabled(value: boolean) {
    this._disabled = value;
  }

  get floatingLabel(): boolean {
    return this.focused ||  (this.hasValue)
  }

  @Input()
  get value(): any { return this._value }
  set value(value: any) {
    this._value = value;
  }
  private _value: any;

  @Output()
  onChange = new EventEmitter<any>()

  get hasValue(): boolean {
    return !!this.value;
  }

  @ContentChild(forwardRef(() => TextFieldLabel))
  contentLabel: TextFieldLabel;

  onFocus() {
    this._focused = true
  }

  onBlur() {
    this._focused = false
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) {
  }

  changeValue(value: any) {
    this._value = value;
    this.onChange.emit(value)
  }
}
