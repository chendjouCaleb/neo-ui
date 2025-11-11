import {Component} from '@angular/core';
import {MyPersonaImage, MyTag, MyTagDismiss, MyPersona} from '../../NeoUI';
import {NgOptimizedImage} from '@angular/common';

@Component({
    templateUrl: 'tag.page.html',
  imports: [
    MyTag,
    MyTagDismiss,
    MyPersonaImage,
    NgOptimizedImage,
    MyPersona
  ],
    selector: 'SelectPage'
})
export class TagPage {

}
