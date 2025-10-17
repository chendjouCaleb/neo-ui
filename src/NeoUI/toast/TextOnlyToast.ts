import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {TOAST_DATA} from './toast-options';
import {NgIf} from '@angular/common';
import {CheckIcon, CircleXIcon, InfoIcon, LucideAngularModule, TriangleAlertIcon, XIcon} from 'lucide-angular';
import {ToastRef} from './toast-ref';

export class TextOnlyToastOptions {
  intent?: 'info' | 'success' | 'danger' | 'warn' | 'load' = 'info'
  title?: string = ''
  body?: string = ''
  showClose?: boolean = false
  action?: string = ''
}

@Component({
    templateUrl: 'TextOnlyToast.html',
    styleUrl: 'TextOnlyToast.scss',
    selector: 'TextOnlyToast',
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgIf,
        LucideAngularModule
    ],
    host: {
        class: 'my-text-only-toast'
    }
})
export class TextOnlyToast {
  icons = { InfoIcon, TriangleAlertIcon, CheckIcon, CircleXIcon, XIcon }
  constructor(@Inject(TOAST_DATA) public readonly options: TextOnlyToastOptions,
              protected _toastRef: ToastRef<any>) {
  }
}
