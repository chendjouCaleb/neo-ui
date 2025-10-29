import {Component} from '@angular/core';
import {
  MaterialIcon,
  MyTextField, TextFieldHint,
  TextFieldInput,
  MyLabel,
  TextFieldLeadingContent,
  TextFieldMessage,
  TextFieldTrailingContent
} from '../../NeoUI';

@Component({
    selector: 'TextFieldPage',
  imports: [
    MyTextField,
    TextFieldInput,
    MyLabel,
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
