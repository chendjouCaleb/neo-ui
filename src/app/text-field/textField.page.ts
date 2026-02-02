import {Component} from '@angular/core';
import {
  MaterialIcon,
  TextField, TextFieldHint,
  TextFieldInput,
  MyLabel,
  TextFieldMessage, MyTextFieldTrailingContent, MyTextFieldLeadingContent
} from '../../NeoUI';

@Component({
  selector: 'TextFieldPage',
  imports: [
    TextField,
    TextFieldInput,
    MyLabel,
    TextFieldMessage,
    MaterialIcon,
    TextFieldHint,
    MyTextFieldTrailingContent,
    MyTextFieldLeadingContent
  ],
  templateUrl: 'textField.page.html'
})
export class TextFieldPage {

}
