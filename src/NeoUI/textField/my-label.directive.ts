import {Directive} from '@angular/core';

@Directive({
  selector: 'MyLabel, [MyLabel]',
  standalone: true,
  host: {
    class: 'my-text-field-label',
    '[class.focused]': 'focused',
    '[class.error]': 'error',
    '[class.floating]': 'floating'
  }
})
export class MyLabel {
  disabled: boolean = false

  focused: boolean

  error: boolean

  floating: boolean
}
