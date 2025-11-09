import {Component, ViewEncapsulation} from '@angular/core';
import {MaterialIcon, TextField, TextFieldInput, MyLabel} from '../../NeoUI';

@Component({
    templateUrl: 'contact.page.html',
    styleUrls: ['contact.page.scss'],
    encapsulation: ViewEncapsulation.None,
    selector: 'ContactPage',
  imports: [ TextField, MyLabel, TextFieldInput, MaterialIcon],
    host: {
        class: 'contact-page'
    }
})
export class ContactPage {
}
