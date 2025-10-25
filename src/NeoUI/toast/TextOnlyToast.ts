import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {TOAST_DATA} from './toast-options';

import {ToastRef} from './toast-ref';
import {MaterialIcon} from '../material-icon';
import {MyPersonaIcon} from '../persona';

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
    MaterialIcon,
    MyPersonaIcon
],
    host: {
        class: 'my-text-only-toast'
    }
})
export class TextOnlyToast {
  constructor(@Inject(TOAST_DATA) public readonly options: TextOnlyToastOptions,
              protected _toastRef: ToastRef<any>) {
  }
}
