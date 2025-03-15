import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {Tooltip} from '../../NeoUI/tooltip';
import {Popover} from '../../NeoUI';

@Component({
  templateUrl: 'popover.page.html',
  standalone: true,
  imports: [
    Tooltip
  ],
  selector: 'PopoverPage'
})
export class PopoverPage {
  @ViewChild(TemplateRef)
  templateRef: TemplateRef<any>

  @ViewChild('trigger')
  trigger: ElementRef<HTMLElement>

  constructor(private popover: Popover) {
  }

  open() {
    this.popover.open(this.trigger.nativeElement, this.templateRef, {})
  }
}
