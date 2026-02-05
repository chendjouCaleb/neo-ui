import {Directive, Input, TemplateRef, ViewRef} from '@angular/core';

export class MyTableCellDefContext {}

@Directive({
  selector: '[MyTableCellDef]',
})
export class MyTableCellDef {

  @Input('MyTableCellDef')
  name: string = '';

  viewRef: ViewRef

  constructor(public readonly templateRef: TemplateRef<MyTableCellDefContext>) {}
}
