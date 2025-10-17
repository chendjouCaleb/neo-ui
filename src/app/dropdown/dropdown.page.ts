import {Component} from '@angular/core';
import {Dropdown} from '../../NeoUI';

@Component({
    templateUrl: 'dropdown.page.html',
    imports: [Dropdown],
    selector: 'DropdownPage'
})
export class DropdownPage {
  dropdownVisible: boolean = false
}
