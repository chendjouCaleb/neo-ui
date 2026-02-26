import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import {MaterialIcon} from '../material-icon';

type MyBadgeColor = 'neutral' | 'primary' | 'success' | 'warn' | 'error' | 'danger';
type MyBadgeSize = 'small' | 'medium';
@Component({
  template: `
    <span class="my-badge-layout">
    <ng-content></ng-content>
  </span>`,
  selector: 'MyBadge, [MyBadge]',
  styleUrl: 'my-badge.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-badge',
    '[class.neutral]':"color == 'neutral'",
    '[class.primary]':"color == 'primary'",
    '[class.success]':"color == 'success'",
    '[class.warn]':"color == 'warn'",
    '[class.error]':"color == 'error'",
    '[class.size-medium]': "size == 'medium'",
    '[class.size-small]': "size == 'small'",
  }
})
export class MyBadge implements AfterContentInit {

  @Input()
  color: MyBadgeColor = 'neutral';

  @Input()
  size: MyBadgeSize = 'medium';

  @ContentChild(MaterialIcon)
  icon: MaterialIcon

  ngAfterContentInit() {
    if(this.icon) {
      this.icon.size = this.size === "small" ? 16 : 20;
    }
  }
}
