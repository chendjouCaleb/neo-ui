import {Routes} from '@angular/router';
import {DropdownPage} from './dropdown/dropdown.page';
import {HorizontalPagerPage} from './horizontal-pager/horizontal-pager.page';
import {TimetablePage} from './timetable/timetable.page';
import {AgendaMonthPage} from './month-calendar/agenda-month.page';
import {AgendaPage} from './agenda/agenda.page';

import {TimetablePlanningPage} from './timetable-planning/timetable-planning.page';
import {AgendaPlanningPage} from './agenda-planning/agenda-planning.page';
import {CheckboxPage} from './checkbox/checkbox.page';
import {PersonaPage} from './persona/persona.page';
import {TooltipPage} from './tooltip/tooltip.page';
import {PopoverPage} from './popover/popover.page';
import {ToastPage} from './toast/toast.page';
import {SwitchPage} from './switch/switch.page';
import {PagerContainer, Skeleton} from '../NeoUI';
import {PagerPage} from './pager/pager.page';
import {MonthCalendarPage} from './agenda-month/month-calendar.page';
import {ButtonPage} from './button/button.page';
import {SelectPage} from './select/select.page';
import {TagPage} from './tag/tag.page';
import {IconButtonPage} from './icon-button/icon-button.page';
import {TextFieldPage} from './textField/textField.page';
import {MenuPage} from './menu/menu.page';
import {SkeletonPage} from './skeleton/skeleton.page';

export const routes: Routes = [
  {path: '', component: ButtonPage },
  {path: 'button', component: ButtonPage },
  {path: 'icon-button', component: IconButtonPage },
  {path: 'tag', component: TagPage },
  {path: 'pager', component: PagerPage },
  {path: 'tooltip', component: TooltipPage },
  {path: 'switch', component: SwitchPage },
  {path: 'toast', component: ToastPage },
  {path: 'select', component: SelectPage },
  {path: 'popover', component: PopoverPage },
  {path: 'skeleton', component: SkeletonPage },

  {path: 'checkbox', component: CheckboxPage},
  {path: 'menu', component: MenuPage},
  {path: 'persona', component: PersonaPage},
  {path: 'persona', component: PersonaPage},
  {path: 'text-field', component: TextFieldPage},
  {path: 'dropdown', component: DropdownPage},
  {path: 'horizontal-pager', component: HorizontalPagerPage},

  {path: 'timetable', component: TimetablePage},
  {path: 'month-calendar', component: MonthCalendarPage},
  {path: 'agenda', component: AgendaPage},
  {path: 'agenda-planning', component: AgendaPlanningPage},
  {path: 'agenda-month', component: AgendaMonthPage},
  {path: 'timetable-planning', component: TimetablePlanningPage},

];
