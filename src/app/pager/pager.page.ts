import {Component} from '@angular/core';
import {MySwitch} from '../../NeoUI/switch';
import {CalendarMonth, CalendarMonthDayDef, Pager, PagerTemplateDef} from '../../NeoUI';
import {LocalDate} from '@js-joda/core';

@Component({
  templateUrl: 'pager.page.html',
  standalone: true,
  imports: [Pager, PagerTemplateDef, CalendarMonth, CalendarMonthDayDef],
  selector: 'InfinitePage'
})
export class PagerPage {

  getDate(index: number): LocalDate {
    return LocalDate.now().plusMonths(index)
  }

  protected readonly indexedDB = indexedDB;
}

