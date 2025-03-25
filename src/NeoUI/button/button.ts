import {ChangeDetectionStrategy, Component, Inject, Input, Optional, ViewEncapsulation} from '@angular/core';
import {MY_BUTTON_DEFAULT_OPTIONS, MyButtonDefaultOptions, MyButtonShape} from './button-options';


@Component({
  templateUrl: 'button.html',
  styleUrl: 'button.scss',
  selector: 'button[MyButton]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    'class': 'my-button',
    '[class.shape-circular]': "shape == 'circular'",
    '[class.shape-rounded]': "shape == 'rounded'",
    '[class.shape-square]': "shape == 'square'",
  }
})
export class Button {

  @Input()
  shape: MyButtonShape

  constructor(@Optional() @Inject(MY_BUTTON_DEFAULT_OPTIONS)
              private _providerOverride?: MyButtonDefaultOptions) {

    this.shape = this._providerOverride && this._providerOverride.shape || 'circular'
  }
}
