import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TabRow} from '../NeoUI/tabRow/tabRow';
import {TabRowItem} from '../NeoUI/tabRow/tabRowItem';
import {HorizontalPager} from '../NeoUI/pager/HorizontalPager';
import {PageContentDef} from '../NeoUI/pager/page-content-ref';
import {TextFieldPage} from './textField/textField.page';
import {DropdownPage} from './dropdown/dropdown.page';
import {ContactPage} from './contact/contact.page';
import {SelectPage} from './select/select.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabRow, TabRowItem, HorizontalPager, PageContentDef, TextFieldPage, DropdownPage, ContactPage, SelectPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NeoUI';
}
