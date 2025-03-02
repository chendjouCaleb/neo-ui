import {Component} from '@angular/core';
import {Dropdown} from '../../NeoUI';

@Component({
  templateUrl: 'dropdown.page.html',
  standalone: true,
  imports: [ Dropdown ],
  selector: 'DropdownPage'
})
export class DropdownPage {
  dropdownVisible: boolean = false
}
