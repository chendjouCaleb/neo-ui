import {Component} from '@angular/core';
import {Button} from '../../NeoUI';
import {MaterialIcon} from '../../NeoUI/material-icon';

@Component({
  templateUrl: 'button.page.html',
  standalone: true,
  imports: [
    Button,
    MaterialIcon
  ],
  selector: 'SelectPage'
})
export class ButtonPage {

}
