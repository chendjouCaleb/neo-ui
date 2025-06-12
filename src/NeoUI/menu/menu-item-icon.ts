import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  template: `<ng-content></ng-content>`,
  selector: 'MyMenuItemIcon, [MyMenuItemIcon]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-menu-item-icon',
  }
})
export class MenuItemIcon {

}
