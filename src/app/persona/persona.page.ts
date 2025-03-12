import {Component} from '@angular/core';
import {MyPersonaIcon, MyPersonaImage, MyPersonaText, Persona} from '../../NeoUI';
import {NgOptimizedImage} from '@angular/common';
import {LucideAngularModule, UserIcon} from 'lucide-angular';

@Component({
  templateUrl: 'persona.page.html',
  standalone: true,
  imports: [
    Persona,
    MyPersonaText,
    MyPersonaImage,
    NgOptimizedImage,
    LucideAngularModule,
    MyPersonaIcon
  ],
  selector: 'SelectPage'
})
export class PersonaPage {
  icons = { UserIcon }
}
