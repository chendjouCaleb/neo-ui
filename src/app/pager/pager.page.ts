import {Component} from '@angular/core';
import {MySwitch} from '../../NeoUI/switch';
import {CalendarMonth, CalendarMonthDayDef, Pager, PagerTemplateDef} from '../../NeoUI';
import {LocalDate} from '@js-joda/core';
import {DateTime} from 'luxon';

@Component({
    templateUrl: 'pager.page.html',
    imports: [Pager, PagerTemplateDef, CalendarMonth, CalendarMonthDayDef],
    selector: 'InfinitePage'
})
export class PagerPage {

  getDate(index: number): DateTime {
    return DateTime.now().plus({month: index})
  }

  protected readonly indexedDB = indexedDB;
}

