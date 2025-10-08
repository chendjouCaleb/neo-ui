import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

export type MySkeletonAnimation = 'pulse' | 'wave';
export type MySkeletonAppearance = 'opaque' | 'translucent';


@Component({
  selector: 'MySkeleton',
  templateUrl: 'skeleton.html',
  styleUrl: 'skeleton.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-skeleton',
    '[class.animation-pulse]': "animation == 'pulse'",
    '[class.animation-wave]': "animation == 'wave'",
    '[style.height.px]': 'height'
  }
})
export class Skeleton {
  @Input()
  height: number;

  @Input()
  animation: MySkeletonAnimation = 'wave'
}
