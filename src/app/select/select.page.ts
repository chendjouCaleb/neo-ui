import {Component} from '@angular/core';
import {TextField} from '../../NeoUI';
import {SelectField} from '../../NeoUI/select/select-field';
import {SelectFieldLabel} from '../../NeoUI/select/select-field-label';
import {Select} from '../../NeoUI/select/select';
import {SelectDropdown} from '../../NeoUI/select/select-dropdown';
import {SelectMenu} from '../../NeoUI/select/select-menu';
import {MySelectOption} from '../../NeoUI/select/option/option';


@Component({
    templateUrl: 'select.page.html',
  imports: [SelectField, SelectFieldLabel, Select, SelectDropdown, SelectMenu, MySelectOption, TextField],
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
