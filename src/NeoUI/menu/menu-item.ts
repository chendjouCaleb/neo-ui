import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  template: `
    <div class="menu-item-layout">
      <ng-content></ng-content>
    </div>`,
  styleUrl: 'menu.scss',
  selector: 'MyMenuItem, [MyMenuItem]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-menu-item',
    role: 'menu-item'
  }
})
export class MenuItem {

}
