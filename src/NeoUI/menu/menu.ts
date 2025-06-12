import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  template: `
    <div class="menu-container">
      <ng-content></ng-content>
    </div>`,
  selector: '[MyMenu], MyMenu',
  styleUrl: 'menu.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-menu',
    role: 'menu'
  }
})
export class Menu {

}
