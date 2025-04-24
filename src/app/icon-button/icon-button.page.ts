import {Component} from '@angular/core';
import {EllipsisIcon, HeartIcon, LucideAngularModule, MenuIcon} from 'lucide-angular';
import {IconButton} from '../../NeoUI/icon-button';

@Component({
  templateUrl: 'icon-button.page.html',
  standalone: true,
  imports: [
    IconButton,
    LucideAngularModule
  ],
  selector: 'IconButtonPage'
})
export class IconButtonPage {
  icons = { EllipsisIcon, MenuIcon, HeartIcon }
}
