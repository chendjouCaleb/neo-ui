import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild, EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation
} from "@angular/core";
import {SelectDropdown} from './select-dropdown';
import {SelectField} from './select-field';

@Component({
  selector: 'MySelect',
  templateUrl: 'select.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'my-select',
  }

})
export class Select implements AfterContentInit {
  private _initialized: boolean = false;


  @ContentChild(forwardRef(() => SelectField))
  selectField: SelectField

  @ContentChild(forwardRef(() => SelectDropdown))
  selectDropdown: SelectDropdown

  ngAfterContentInit() {
    this.selectDropdown.trigger = this.selectField.host
    this.selectField.host.addEventListener('click', () => {
      this.selectDropdown.open()
    })
  }
}
