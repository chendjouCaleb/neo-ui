import {Component} from '@angular/core';
import {MaterialIcon, MyPersonaIcon, MyPersonaImage, MyPersonaText, MyPersona} from '../../NeoUI';
import {NgOptimizedImage} from '@angular/common';

@Component({
    templateUrl: 'persona.page.html',
  imports: [
    MyPersona,
    MyPersonaText,
    MyPersonaImage,
    NgOptimizedImage,
    MyPersonaIcon,
    MaterialIcon
  ],
    selector: 'SelectPage'
})
export class PersonaPage {
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
