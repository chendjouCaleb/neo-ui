import {ChangeDetectionStrategy, Component, Inject, Input, Optional, ViewEncapsulation} from '@angular/core';
import {MY_TAG_DEFAULT_OPTIONS, MyTagAppearance, MyTagDefaultOptions, MyTagShape, MyTagSize} from './tag-options';





@Component({
  templateUrl: 'tag.html',
  styleUrl: 'tag.scss',
  selector: 'MyTag',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'my-tag',
    '[class.size-extra-small]': "size == 'extra-small'",
    '[class.size-small]': "size == 'small'",
    '[class.size-medium]': "size == 'medium'",

    '[class.shape-rounded]' : "shape == 'rounded'",
    '[class.shape-circular]': "shape == 'circular'",

    '[class.appearance-filled]': "appearance == 'filled'",
    '[class.appearance-outline]': "appearance == 'outline'",

    '[class.selected]' : 'selected',
    '[class.disabled]' : 'disabled'
  }
})
export class Tag {
  @Input()
  disabled: boolean = false;

  @Input()
  shape: MyTagShape = 'rounded'

  @Input()
  size: MyTagSize = 'medium';

  @Input()
  appearance: MyTagAppearance = 'filled'

  @Input()
  selected: boolean = false;

  constructor(@Optional() @Inject(MY_TAG_DEFAULT_OPTIONS) _defaultOptions: MyTagDefaultOptions) {
    if(_defaultOptions) {
      this.shape = _defaultOptions.shape
      this.size = _defaultOptions.size
      this.appearance = _defaultOptions.appearance;
    }
  }

}
