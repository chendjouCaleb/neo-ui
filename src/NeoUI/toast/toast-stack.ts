import {ToastRef} from './toast-ref';
import {Overlay} from '@angular/cdk/overlay';

export class ToastStack {
  toasts: ToastRef<any>[] = [];

  constructor(private overlay: Overlay) {
  }

  addToast(toast: ToastRef<any>) {
    this.toasts.unshift(toast);
    if(this.toasts.length > 1) {
      this.updateToastPositions()
    }
  }

  removeToast(toast: ToastRef<any>) {
    // const index = this.toasts.findIndex(t => t.id === toast.id);
    // if(index > -1) {
    //   console.log(index)
    //   delete this.toasts[index]
    //   this.updateToastPositions()
    // }

    this.toasts = this.toasts.filter(t => t.id !== toast.id);
    this.updateToastPositions()
  }


  updateToastPositions() {
    let offset = 8;
    for (const toast of this.toasts) {
            toast._containerInstance._translateY = -offset;
      console.log(toast._containerInstance.transform)
      toast._containerInstance._changeDetector.detectChanges()
      offset += toast._containerInstance._elementRef.nativeElement.getBoundingClientRect().height + 8;
    }
  }
}
