import {Component} from '@angular/core';
import {convert, DateTimeFormatter, LocalDate, ZonedDateTime} from '@js-joda/core';
import {Agenda, AgendaEventContentDef, AgendaHeaderCellDef} from '../../NeoUI';
import {DateTime} from 'luxon';
import {eventList} from '../event-list';

@Component({
    templateUrl: 'agenda.page.html',
    imports: [Agenda, AgendaEventContentDef, AgendaHeaderCellDef],
    selector: 'AgendaPage'
})
export class AgendaPage {
  items = eventList

  toJsDate(date: LocalDate): Date {
    return convert(date).toDate()
  }

  hourFormatter = DateTimeFormatter.ofPattern('HH:mm')

  toDateTime(date: ZonedDateTime): DateTime {
    return DateTime.fromJSDate(convert(date).toDate())
  }
}
