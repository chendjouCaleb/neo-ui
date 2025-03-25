import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';


export type MyButtonShape = 'rounded' | 'circular' | 'square'

@Component({
  templateUrl: 'button.html',
  styleUrl: 'button.scss',
  selector: 'button[MyButton]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    'class': 'my-button'
  }
})
export class Button {

}
