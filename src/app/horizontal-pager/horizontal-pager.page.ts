import {Component} from '@angular/core';
import {HorizontalPager, PageContentDef, TabRow, TabRowItem} from '../../NeoUI';

@Component({
  selector: 'PagerPage',
  standalone: true,
  templateUrl: 'horizontal-pager.page.html',
  imports: [ TabRow, TabRowItem, HorizontalPager, PageContentDef]
})
export class HorizontalPagerPage {

}
