import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

export type TextFieldMessageIntent = 'info'| "error" | 'warning' | 'success' | 'custom' | 'none';

@Component({
  selector: 'MyTextFieldMessage',
  templateUrl: 'textField-message.html',
  styleUrl: 'textField-message.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-textField-message',
    '[class.intent-success]': "intent == 'success'",
    '[class.intent-warning]': "intent == 'warning'",
    '[class.intent-error]': "intent == 'error'",
    '[class.intent-info]': "intent == 'info'",
    '[class.intent-custom]': "intent == 'custom'",
  }
})
export class TextFieldMessage {
  @Input()
  intent: TextFieldMessageIntent = 'info';

  get showIntent(): boolean {
    return this.intent && this.intent !== 'none';
  }
}
