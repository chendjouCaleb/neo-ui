import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  templateUrl: 'tabRowItem.html',
  selector: 'button[TabRowItem]',
  standalone: true,
  styleUrls: ['tabRow.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'tab-row-item',
    '[class.active]': 'active'
  }
})
export class TabRowItem {
  @ViewChild('innerBox')
  innerBox: ElementRef<HTMLElement> | undefined

  @Input()
  active: boolean = false

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }



  get host(): HTMLElement {
    return this.elementRef.nativeElement
  }

  get innerBoxHost(): HTMLElement {
    return this.innerBox?.nativeElement!
  }
}
