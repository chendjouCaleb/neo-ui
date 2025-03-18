import {Component} from '@angular/core';
import {MySwitch} from '../../NeoUI/switch';
import {Pager, PagerTemplateDef} from '../../NeoUI';

@Component({
  templateUrl: 'pager.page.html',
  standalone: true,
  imports: [Pager, PagerTemplateDef],
  selector: 'InfinitePage'
})
export class PagerPage {

}

