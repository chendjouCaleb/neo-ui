import {Component} from '@angular/core';
import { MyHorizontalPager, PageContentDef, TabRow, TabRowItem} from '../../NeoUI';

@Component({
    selector: 'PagerPage',
    templateUrl: 'horizontal-pager.page.html',
  imports: [TabRow, TabRowItem,  PageContentDef, MyHorizontalPager]
})
export class HorizontalPagerPage {

}
