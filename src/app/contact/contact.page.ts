import {Component, ViewEncapsulation} from '@angular/core';
import {MaterialIcon, MyTextField, TextFieldInput, TextFieldLabel} from '../../NeoUI';

@Component({
    templateUrl: 'contact.page.html',
    styleUrls: ['contact.page.scss'],
    encapsulation: ViewEncapsulation.None,
    selector: 'ContactPage',
  imports: [ MyTextField, TextFieldLabel, TextFieldInput, MaterialIcon],
    host: {
        class: 'contact-page'
    }
})
export class ContactPage {
}
