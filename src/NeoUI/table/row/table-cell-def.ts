import {Directive, TemplateRef} from '@angular/core';

export interface MyTableCellDefContext {

}

@Directive({
  selector: '[MyTableCellDef]',
})
export class MyTableCellDef {
  constructor(public readonly templateRef: TemplateRef<any>) {
  }
}
