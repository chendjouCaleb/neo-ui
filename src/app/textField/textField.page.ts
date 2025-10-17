import {Component} from '@angular/core';
import {TextField, TextFieldLabel} from '../../NeoUI';
import {TextFieldInput} from '../../NeoUI';

@Component({
    selector: 'TextFieldPage',
    imports: [
        TextField,
        TextFieldInput,
        TextFieldLabel
    ],
    templateUrl: 'textField.page.html'
})
export class TextFieldPage {

}
