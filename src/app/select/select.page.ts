import {Component} from '@angular/core';
import {MySelect, MySelectTrigger} from '../../NeoUI/select/select';
import {MyOption} from '../../NeoUI/select/option/option';
import {countryListAlpha2} from '../variousCountryListFormats';
import {MyTextField, TextFieldInput, TextFieldLabel} from '../../NeoUI';


@Component({
  templateUrl: 'select.page.html',
  imports: [MySelect, MyOption, MySelectTrigger, MyTextField, TextFieldInput, TextFieldLabel],
  selector: 'SelectPage'
})
export class SelectPage {
  dropdownVisible: boolean = false



  countries: Country[] = Object.keys(countryListAlpha2).map(key => ({
    code: key,
    name: countryListAlpha2[key]
  }));
  filteredCountries: Country[] = this.countries;

  filter(q: string){
    this.filteredCountries = this.countries.filter(c => c.name.toLowerCase().indexOf(q.toLowerCase()) > -1)
  }

  getFlagClass(countryCode: string): string {
    return `fi fi-${countryCode.toLowerCase()}`
  }
}

export interface Country {
  name: string,
  code: string
}
