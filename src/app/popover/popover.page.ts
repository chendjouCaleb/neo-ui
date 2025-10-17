import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {Tooltip} from '../../NeoUI/tooltip';
import {Popover} from '../../NeoUI';
import {TooltipPosition} from '../../NeoUI/toolttip-position';

@Component({
    templateUrl: 'popover.page.html',
    styleUrl: 'popover.page.scss',
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
    const popoverRef = this.popover.open(this.trigger.nativeElement, this.templateRef, { beakRadius: 16, gap: 8 })
    popoverRef.afterClosed().subscribe(() => {
      console.log('Popover closed')
    })

    popoverRef.beforeClosed().subscribe(() => {
      console.log('Popover launch close')
    })

    popoverRef.afterOpened().subscribe(() => {
      console.log('Popover opened')
    })
  }

  openAt(event: Event, position: TooltipPosition) {
    this.popover.open(event.target as HTMLElement, this.templateRef, { position })
  }


}
