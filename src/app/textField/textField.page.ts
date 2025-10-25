import {Component} from '@angular/core';
import {
  MaterialIcon,
  TextField, TextFieldHint,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLeadingContent,
  TextFieldMessage,
  TextFieldTrailingContent
} from '../../NeoUI';

@Component({
    selector: 'TextFieldPage',
  imports: [
    TextField,
    TextFieldInput,
    TextFieldLabel,
    TextFieldMessage,
    TextFieldLeadingContent,
    MaterialIcon,
    TextFieldTrailingContent,
    TextFieldHint
  ],
    templateUrl: 'textField.page.html'
})
export class TextFieldPage {

}
