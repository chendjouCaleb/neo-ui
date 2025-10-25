import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  template: `
    <div class="my-hint-label">
        {{label}}
    </div>

    <div class="my-hint-content">
      <ng-content></ng-content>
    </div>
  `,
  selector: 'MyTextFieldHint',
  encapsulation: ViewEncapsulation.None,
  host: {
    class:'my-text-field-hint'
  }
})
export class TextFieldHint {
  @Input()
  label: string = ''
}
