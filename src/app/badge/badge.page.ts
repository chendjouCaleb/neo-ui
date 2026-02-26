import {Component} from '@angular/core';
import {MyPersonaImage, MyTag, MyTagDismiss, MyPersona, MyBadge, MaterialIcon} from '../../NeoUI';
import {NgOptimizedImage} from '@angular/common';

@Component({
    templateUrl: 'badge.page.html',
  imports: [
    MyBadge,
    MaterialIcon
  ],
    selector: 'SelectPage'
})
export class BadgePage {

}
