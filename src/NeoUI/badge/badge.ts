import {Component, Input, ViewEncapsulation} from "@angular/core";

type MyBadgeColor = 'neutral' | 'primary' | 'success' | 'warn' | 'error' | 'danger'
@Component({
  template: `
    <span class="my-badge-layout">
    <ng-content></ng-content>
  </span>`,
  selector: 'MyBadge, [MyBadge]',
  styleUrl: 'my-badge.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'my-badge',
    '[class.neutral]':"color == 'neutral'",
    '[class.primary]':"color == 'primary'",
    '[class.success]':"color == 'success'",
    '[class.warn]':"color == 'warn'",
    '[class.error]':"color == 'error'",
  }
})
export class MyBadge {

  @Input()
  color: MyBadgeColor = 'neutral'
}
