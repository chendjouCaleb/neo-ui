import {Directive, TemplateRef} from '@angular/core';
import {LocalDate} from '@js-joda/core';
import {AgendaEventDescriptor} from '../agenda';

export interface AgendaMonthDayContext {
  day: LocalDate
  events: AgendaEventDescriptor[]
}

@Directive({
  standalone: true,
  selector: '[AgendaMonthDayDef]',

})
export class AgendaMonthDayDef {
  constructor(public template: TemplateRef<AgendaMonthDayContext>) {}


}
