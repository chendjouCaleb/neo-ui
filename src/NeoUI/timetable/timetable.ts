import {
  Component,
  ContentChild,
  ElementRef,
  Injector,
  Input, QueryList,
  StaticProvider,
  ViewChildren, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {DayOfWeek, dayOfWeeks, DayOfWeeksFrIntl, TimetableItemDescriptor} from './timetable-item-descriptor';
import {ChronoUnit, DateTimeFormatter, LocalTime} from '@js-joda/core';
import {min} from 'rxjs';
import {TimetableItem, TimetableItemDef} from './timetable-item-def';
import {PageContentDef, PageContext} from '../pager';

@Component({
  selector: 'Timetable',
  templateUrl: 'timetable.html',
  styleUrl: 'timetable.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    TimetableItem
  ],
  host: {
    class: 'timetable',
    '[style.height.px]': 'getHourOffsetY(lastHour) + 60'
  }
})
export class Timetable {
  dayOfWeeks = dayOfWeeks


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
  startHour = LocalTime.parse("04:30")

  @Input()
  hourHeight = 48;

  @Input()
  items: TimetableItemDescriptor[] = []

  @Input()
  hourFormatter = DateTimeFormatter.ofPattern('HH:mm')

  @Input()
  timelineWidth: number = 96

  @ContentChild(TimetableItemDef)
  itemTemplateDef: TimetableItemDef

  @ViewChildren(ElementRef)
  columns :QueryList<ElementRef<HTMLElement>>

  get gridTemplateColumns(): string {
    return `${this.timelineWidth}px 1fr 1fr 1fr 1fr 1fr 1fr 1fr`;
  }

  constructor(private parentInjector: Injector) {}

  getDayItems(day: DayOfWeek) : TimetableItemDescriptor[] {
    return this.items.filter(i => i.dayOfWeek === day);
  }

  getHourOffsetY(hour: LocalTime) {
    const minutes = this.startHour.until(hour, ChronoUnit.MINUTES);
    return minutes * this.hourHeight / 60;
  }

  get lastHour(): LocalTime {
    return this.timelineHours[this.timelineHours.length - 1]
  }


  dayOfWeekIntl(dayOfWeek: DayOfWeek) {
    return DayOfWeeksFrIntl[dayOfWeek - 1]
  }

}
