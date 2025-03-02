﻿import {Component} from '@angular/core';
import {Dropdown, TextField, TextFieldInput, TextFieldLabel} from '../../NeoUI';
import {SelectField} from '../../NeoUI/select/select-field';
import {SelectFieldLabel} from '../../NeoUI/select/select-field-label';
import {Select} from '../../NeoUI/select/select';
import {SelectDropdown} from '../../NeoUI/select/select-dropdown';
import {SelectMenu} from '../../NeoUI/select/select-menu';
import {SelectMenuItem} from '../../NeoUI/select/select-menu-item';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  templateUrl: 'select.page.html',
  standalone: true,
  imports: [SelectField, SelectFieldLabel, Select, SelectDropdown, SelectMenu, SelectMenuItem, NgForOf, NgIf, TextField, TextFieldInput, TextFieldLabel],
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
