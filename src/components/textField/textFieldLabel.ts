import {Directive} from '@angular/core';

@Directive({
  selector: 'TextFieldLabel, [TextFieldLabel]',
  standalone: true,
  host: {
    'class': 'text-field-label'
  }
})
export class TextFieldLabel {
  disabled: boolean = false
}
