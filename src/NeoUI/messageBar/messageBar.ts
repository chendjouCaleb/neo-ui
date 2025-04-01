import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  templateUrl: 'messageBar.html',
  styleUrl: 'messageBar.scss',
  selector: 'MyMessageBar',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-messageBar',
    role: 'alert'
  }
})
export class MessageBar {

}
