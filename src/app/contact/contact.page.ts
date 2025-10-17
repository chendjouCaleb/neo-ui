import {Component, ViewEncapsulation} from '@angular/core';
import {MaterialIcon, TextField, TextFieldInput, TextFieldLabel} from '../../NeoUI';

@Component({
    templateUrl: 'contact.page.html',
    styleUrls: ['contact.page.scss'],
    encapsulation: ViewEncapsulation.None,
    selector: 'ContactPage',
  imports: [ TextField, TextFieldLabel, TextFieldInput, MaterialIcon],
    host: {
        class: 'contact-page'
    }
})
export class ContactPage {
}
