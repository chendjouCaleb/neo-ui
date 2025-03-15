import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {Tooltip} from '../../NeoUI/tooltip';
import {Popover, PopoverPosition} from '../../NeoUI';

@Component({
  templateUrl: 'popover.page.html',
  styleUrl: 'popover.page.scss',
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
    this.popover.open(this.trigger.nativeElement, this.templateRef, { beakRadius: 16, gap: 8 })
  }

  openAt(event: Event, position: PopoverPosition) {
    this.popover.open(event.target as HTMLElement, this.templateRef, { position })
  }


}
