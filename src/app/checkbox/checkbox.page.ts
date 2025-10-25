import {Component} from '@angular/core';
import {MyCheckbox} from '../../NeoUI';

import {MyRadio} from '../../NeoUI/radio/radio';

@Component({
    templateUrl: 'checkbox.page.html',
  imports: [MyCheckbox, MyRadio],
    selector: 'SelectPage'
})
export class CheckboxPage {
  dropdownVisible: boolean = false

  selectedOption: string = 'option1'

  change(checked){
    console.log(checked)
  }
}


export interface Country {
  name: string,
  code: string
}
