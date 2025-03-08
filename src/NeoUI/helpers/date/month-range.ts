import {LocalDate} from '@js-joda/core';


export class MonthRange {
  private _range: LocalDate[] = [];
  private _prevRange: LocalDate[] = [];
  private _nextRange: LocalDate[] = [];

  get range(): LocalDate[] {
    return this._range.slice();
  }

  get prevRange(): LocalDate[] {
    return this._prevRange.slice();
  }

  get nextRange(): LocalDate[] {
    return this._nextRange.slice();
  }

  get first(): LocalDate {
    return LocalDate.of(this._year, this._month, 1);
  }

  get last(): LocalDate {
    return this.range[this.range.length - 1];
  }

  get month(): number {
    return this._month;
  }

  get year(): number {
    return this._year;
  }

  constructor(private _year?: number, private _month?: number,) {
    if (_year === undefined || _year < 0) {
      this._year = LocalDate.now().year()
    }

    if (_month === undefined || _month < 0 && _month > 11) {
      this._month = LocalDate.now().monthValue()
    }

    this.setRange();
    this.setPrevRange();
    this.setNextRange();
    this.completeRange();
  }

  public static fromLocalDate(localDate: LocalDate): MonthRange {
    return new MonthRange(localDate.year(), localDate.monthValue());
  }

  nextMonth(): MonthRange {
    if (this.month === 12) {
      return new MonthRange(this.year + 1, 1);
    }
    return new MonthRange(this.year, this.month + 1);
  }

  prevMonth(): MonthRange {
    if (this.month === 1) {
      return new MonthRange(this.year - 1, 12);
    }
    return new MonthRange(this.year, this.month - 1);
  }

  private setRange() {
    let currentLocalDate = this.first;
    this._range = [];

    for (let i = 0; i < 32; i++) {
      if (currentLocalDate.monthValue() === this.month) {
        this._range.push(currentLocalDate);
        currentLocalDate = currentLocalDate.plusDays(1)
      }
    }
  }

  private setPrevRange() {
    let start = this.first.dayOfWeek().value();
    let currentLocalDate = this.first;
    while (start > 0) {
      currentLocalDate = currentLocalDate.minusDays(1)
      this._prevRange.unshift(currentLocalDate);
      start -= 1;
    }

    // console.log(this._prevRange.map(f => f.toLocalDate()))
  }

  private setNextRange() {
    let start = this.last.dayOfWeek().value();
    let currentLocalDate = this.last;
    while (start < 6) {
      currentLocalDate = currentLocalDate.plusDays(1)
      this._nextRange.push(currentLocalDate);
      start += 1;
    }
  }

  private completeRange() {
    const length = this.range.length + this.prevRange.length + this.nextRange.length;

    if (length < 42) {
      let currentLocalDate = this._nextRange[this._nextRange.length - 1] || this.last;
      let start = 0;
      while (start < 42 - length) {
        currentLocalDate = currentLocalDate.plusDays(1)
        this._nextRange.push(currentLocalDate);
        start += 1;
      }
    }
  }

  getWeeksRanges(): Array<LocalDate[]> {
    const weeks: Array<LocalDate[]> = [];
    const localDates = [...this._prevRange, ...this._range, ...this._nextRange];

    let i = 0;

    while (i < localDates.length) {
      weeks.push(localDates.slice(i, i + 7));
      i += 7;
    }

    return weeks;
  }
}


export function normalizeDayOfWeeks(day: number) {
  if (day === 0) {
    return 6;
  }
  if (day === 6) {
    return 0;
  }

  return day - 1;
}
