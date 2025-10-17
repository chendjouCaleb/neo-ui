import {Component, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';

import {Toast} from '../../NeoUI/toast/toast';

@Component({
    templateUrl: 'toast.page.html',
    styleUrl: 'toast.page.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [
    ],
    selector: 'ToastPage'
})
export class ToastPage {
  @ViewChild(TemplateRef)
  templateRef: TemplateRef<any>


  constructor(protected toast: Toast) {
  }

  open() {
    const popoverRef = this.toast.open(this.templateRef, { duration: 5000 })
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

  openAt(event: Event) {
    this.toast.open(this.templateRef, { duration: 5000 })
  }

  openTextToast() {
    this.toast.show({intent: 'info', title: ''},)
  }

}
