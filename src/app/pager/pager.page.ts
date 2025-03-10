﻿import {Component} from '@angular/core';
import {HorizontalPager, PageContentDef, TabRow, TabRowItem} from '../../NeoUI';

@Component({
  selector: 'PagerPage',
  standalone: true,
  templateUrl: 'pager.page.ts',
  imports: [ TabRow, TabRowItem, HorizontalPager, PageContentDef]
})
export class PagerPage {

}
