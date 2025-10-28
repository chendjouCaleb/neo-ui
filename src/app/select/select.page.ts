import {Component} from '@angular/core';
import {MySelect, MySelectTrigger} from '../../NeoUI/select/select';
import {MyOption} from '../../NeoUI/select/option/option';


@Component({
    templateUrl: 'select.page.html',
  imports: [MySelect, MyOption, MySelectTrigger],
    selector: 'SelectPage'
})
export class SelectPage {
  dropdownVisible: boolean = false

  countries: Country[] = [
    {code: 'CM', name: 'Cameroun'},
    {code: 'FR', name: 'France'},
    {code: 'ZA', name: 'Afrique du Sud'},
    {code: 'DE', name: 'Allemagne' },
    {code: 'SA', name: 'Arabie Saoudite 1111' },
    {code: 'AU', name: 'Australie' },
    {code: 'BE', name: 'Belgique' },
    {code: 'CA', name: 'Canada' },
    {code: 'US', name: 'Etats-Unis d\'Amérique' },
    {code: 'GA', name: 'Gabon' },
  ]
}


export interface Country {
  name: string,
  code: string
}
