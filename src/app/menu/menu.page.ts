import {Component} from '@angular/core';
import {MaterialIcon, Menu, MenuItem} from '../../NeoUI';
import {MenuItemIcon} from '../../NeoUI/menu/menu-item-icon';

@Component({
    templateUrl: 'menu.page.html',
  imports: [Menu, MenuItem, MenuItemIcon, MaterialIcon],
    selector: 'SelectPage'
})
export class MenuPage {
}
