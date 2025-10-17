import {Component} from '@angular/core';
import {Menu, MenuItem} from '../../NeoUI';
import {NgForOf, NgIf} from '@angular/common';
import {ClipboardIcon, CopyIcon, LucideAngularModule, PencilIcon, ScissorsIcon, TrashIcon} from 'lucide-angular';
import {MenuItemIcon} from '../../NeoUI/menu/menu-item-icon';

@Component({
    templateUrl: 'menu.page.html',
    imports: [NgForOf, NgIf, Menu, MenuItem, LucideAngularModule, MenuItemIcon],
    selector: 'SelectPage'
})
export class MenuPage {
  icons = { CopyIcon, ClipboardIcon, TrashIcon, PencilIcon, ScissorsIcon }
}
