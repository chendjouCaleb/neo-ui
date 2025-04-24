import {Component} from '@angular/core';
import {Button, MyPersonaImage, Persona, Tag, TagDismiss} from '../../NeoUI';
import {NgOptimizedImage} from '@angular/common';

@Component({
  templateUrl: 'tag.page.html',
  standalone: true,
  imports: [
    Button,
    Tag,
    TagDismiss,
    MyPersonaImage,
    NgOptimizedImage,
    Persona
  ],
  selector: 'SelectPage'
})
export class TagPage {

}
