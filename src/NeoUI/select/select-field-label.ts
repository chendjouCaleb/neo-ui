import {Directive} from '@angular/core';

@Directive({
  selector: 'SelectFieldLabel, [SelectFieldLabel]',
  standalone: true,
  host: {
    'class': 'my-select-field-label'
  }
})
export class SelectFieldLabel {
  disabled: boolean = false
}
