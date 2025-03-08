import {AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ChronoUnit, DateTimeFormatter, LocalTime, ZonedDateTime} from '@js-joda/core';
import {AgendaEventDescriptor} from './agenda-event-descriptor';
import {
  AgendaEventContentDef,
  AgendaEventContentDefContext,
  AgendaHeaderCellDef,
  AgendaHourDef
} from './agenda-event-content';
import {NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
  templateUrl: 'agenda.html',
  styleUrl: 'agenda.scss',
  selector: 'MyAgenda',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet
  ],
  host: {
    class: 'my-agenda'
  }
})
export class Agenda implements AfterViewInit, OnInit {
  _initialized = false
  @Input()
  startHour = LocalTime.parse("04:30")

  @Input()
  endHour = LocalTime.parse("18:30")

  @Input()
  hourHeight = 48;

  @Input()
  timelineWidth: number = 96;

  @Input()
  hourFormatter = DateTimeFormatter.ofPattern('HH:mm')

  @Input()
  days: ZonedDateTime[] = [ZonedDateTime.now(),
    ZonedDateTime.now().plusDays(1),
    ZonedDateTime.now().plusDays(2),
    ZonedDateTime.now().plusDays(3),
    ZonedDateTime.now().plusDays(4),
    ZonedDateTime.now().plusDays(5),
  ];

  @Input()
  timelineHours = [
    LocalTime.parse("05:00"),
    LocalTime.parse("06:00"),
    LocalTime.parse("07:00"),
    LocalTime.parse("08:00"),
    LocalTime.parse("09:00"),
    LocalTime.parse("10:00"),
    LocalTime.parse("11:00"),
    LocalTime.parse("12:00"),
    LocalTime.parse("13:00"),
    LocalTime.parse("14:00"),
    LocalTime.parse("14:30"),
    LocalTime.parse("15:00"),
    LocalTime.parse("16:00"),
    LocalTime.parse("17:00"),
  ];

  @Input()
  events: AgendaEventDescriptor[] = []

  @ContentChild(AgendaHeaderCellDef)
  headerCellTemplateDef: AgendaHeaderCellDef

  @ContentChild(AgendaHourDef)
  hourTemplateDef: AgendaHourDef

  @ContentChild(AgendaEventContentDef)
  eventTemplateDef: AgendaEventContentDef

  ngAfterViewInit() {

  }

  ngOnInit() {
    Promise.resolve().then(() => {

    });
    setTimeout(() => {this._initialized = true}, 500)
  }

  getDayEvents(day: ZonedDateTime): AgendaEventDescriptor[] {
    return this.events.filter(e => e.day.toLocalDate().equals(day.toLocalDate()))
  }

  _getColumnGridTemplate(): string {
    const dayTemplate = this.days.map(d => "1fr").join(" ")
    return `${this.timelineWidth}px ${dayTemplate}`
  }

  _getBodyHeight(): number {
    return this.startHour.until(this.endHour, ChronoUnit.MINUTES)/60 * this.hourHeight;
  }

  _getHourTop(hour: LocalTime): number {
    return this.startHour.until(hour, ChronoUnit.MINUTES)/60 * this.hourHeight
  }

  _getRangeHeight(from: LocalTime, to: LocalTime): number {
    return this._getHourTop(to) - this._getHourTop(from)
  }

  _getEventTemplateContext(event: AgendaEventDescriptor): AgendaEventContentDefContext {
    return {
      event: event
    }
  }

  async _getElementBoxHeight1(elementRef: HTMLElement): Promise<number> {
    // if (!this._initialized){
    //   return 0
    // }
    // return elementRef.getBoundingClientRect().height

    return Promise.resolve(elementRef.getBoundingClientRect().height);
  }

  _getElementBoxHeight(elementRef: HTMLElement): number {
    return elementRef.getBoundingClientRect().height
  }
}
