import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';


export type MyIconButtonSize = 'large' | 'medium' | 'small';
export type MyIconAppearance = 'neutral' | 'standard' | 'tonal' | 'filled'

@Component({
  templateUrl: 'icon-button.html',
  styleUrl: 'icon-button.scss',
  selector: 'button[MyIconButton], button[my-icon-button]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-icon-button',
    '[class.size-large]': "size === 'large'",
    '[class.size-medium]': "size === 'medium'",
    '[class.size-small]': "size === 'small'",

    '[class.appearance-neutral]': "appearance == 'neutral'",
    '[class.appearance-standard]': "appearance == 'standard'",
    '[class.appearance-tonal]': "appearance == 'tonal'",
    '[class.appearance-filled]': "appearance == 'filled'",
  }
})
export class IconButton {
  @Input()
  size: MyIconButtonSize = 'medium';

  @Input()
  appearance: MyIconAppearance = 'neutral'
}
