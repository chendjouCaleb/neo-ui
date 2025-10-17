import {Component} from '@angular/core';
import {MyPersonaIcon, MyPersonaImage, MyPersonaText, Persona} from '../../NeoUI';
import {NgOptimizedImage} from '@angular/common';
import {LucideAngularModule, UserIcon} from 'lucide-angular';

@Component({
    templateUrl: 'persona.page.html',
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
  paletteColors =
    [
      "Red",
      "Green",
      "DarkOrange",
      "Yellow",
      "Berry",
      "LightGreen",
      "Marigold",
      "DarkRed",
      "Cranberry",
      "Pumpkin",
      "Peach",
      "Gold",
      "Brass",
      "Brown",
      "Forest",
      "Seafoam",
      "DarkGreen",
      "LightTeal",
      "Teal",
      "Steel",
      "Blue",
      "RoyalBlue",
      "Cornflower",
      "Navy",
      "Lavender",
      "Purple",
      "Grape",
      "Lilac",
      "Pink",
      "Magenta",
      "Plum",
      "Beige",
      "Mink",
      "Platinum",
      "Anchor"
    ];
}
