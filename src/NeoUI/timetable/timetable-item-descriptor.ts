import {LocalTime} from '@js-joda/core';

export enum DayOfWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7
}

export const dayOfWeeks = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday
]

export const DayOfWeeksFrIntl = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]


export function formatDayOfWeek(dayOfWeek: DayOfWeek, format: string = 'cccc'): string {
  const formatted = DayOfWeeksFrIntl[dayOfWeek - 1];

  if(format === 'cccc') {
    return formatted
  }
  if(format === 'ccc') {
    return formatted.substring(0, 3)
  }

  if(format === 'cc') {
    return formatted.substring(0, 2)
  }
  if(format === 'c') {
    return formatted.substring(0, 1)
  }

  throw new Error(`Unknown day of week format ${format}`)
}

export class TimetableItemDescriptor {
  title: string
  color?: string
  dayOfWeek: DayOfWeek
  startAt: LocalTime
  endAt: LocalTime
}
