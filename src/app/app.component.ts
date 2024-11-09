import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TabRow} from '../components/tabRow/tabRow';
import {TabRowItem} from '../components/tabRow/tabRowItem';
import {HorizontalPager} from '../components/pager/HorizontalPager';
import {PageContentDef} from '../components/pager/page-content-ref';
import {TextFieldPage} from './textField/textField.page';
import {DropdownPage} from './pager/dropdown/dropdown.page';
import {ContactPage} from './contact/contact.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabRow, TabRowItem, HorizontalPager, PageContentDef, TextFieldPage, DropdownPage, ContactPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NeoUI';
}
