import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  templateUrl: 'tag-dismiss.html',
  selector: 'MyTagDismiss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'my-tag-dismiss'
  }
})
export class TagDismiss {

}
