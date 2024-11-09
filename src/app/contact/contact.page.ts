import {Component, ViewEncapsulation} from '@angular/core';
import {
  LucideAngularModule,
  UserRoundIcon,
  LanguagesIcon,
  StickyNoteIcon,
  BriefcaseBusinessIcon,
  BuildingIcon,
  MailIcon,
  PhoneIcon,
  PlaneIcon,
  MapPinIcon,
  UniversityIcon,
  UsersRoundIcon, PinIcon
} from 'lucide-angular';
import {TextField, TextFieldInput, TextFieldLabel} from '../../components';

@Component({
  templateUrl: 'contact.page.html',
  standalone: true,
  styleUrls: ['contact.page.scss'],
  encapsulation: ViewEncapsulation.None,
  selector: 'ContactPage',
  imports: [LucideAngularModule, TextField, TextFieldLabel, TextFieldInput],
  host: {
    class: 'contact-page'
  }
})
export class ContactPage {
  userIcon = UserRoundIcon
  mailIcon = MailIcon
  phoneIcon = PhoneIcon
  pinIcon = MapPinIcon
  universityIcon = UniversityIcon
}
