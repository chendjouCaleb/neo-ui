import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  templateUrl: 'select-menu-item.html',
  styleUrl: 'select-menu.scss',
  selector: 'MySelectMenuItem, [MySelectMenuItem]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf
  ],
  host: {
    class: 'my-select-menu-item',
    role: 'menu-item',
    '(click)': 'onClick()'
  }
})
export class SelectMenuItem {
  @Input()
  set checked(value: boolean) {
    if(value != this._checked) {
      this._checked = value;
    }
  }
  get checked(): boolean {
    return this._checked;
  }
  private _checked: boolean;

  @Input()
  value: any

  @Output()
  get onChange(): Observable<boolean> {
    return this._onChange.asObservable();
  }
  private _onChange = new EventEmitter<boolean>();

  onClick() {
    this.changeState(!this.checked);
  }

  changeState(value: boolean) {
    if(value != this._checked) {
      this._checked = value
      this._onChange.emit(value);
    }
  }
}
