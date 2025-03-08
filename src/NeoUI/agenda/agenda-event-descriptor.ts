import {LocalTime, ZonedDateTime} from '@js-joda/core';

export interface AgendaEventDescriptor {
  day: ZonedDateTime,
  startHour: LocalTime
  endHour: LocalTime
  title: string
  color: string
}
