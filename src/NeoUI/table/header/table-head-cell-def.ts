import {Directive, Input, TemplateRef, ViewRef} from '@angular/core';

export class MyTableHeadCellDefContext {}

@Directive({
  selector: '[MyTableHeadCellDef]',
})
export class MyTableHeadCellDef {

  @Input('MyTableHeadCellDef')
  name: string = '';

  viewRef: ViewRef

  constructor(public readonly templateRef: TemplateRef<MyTableHeadCellDefContext>) {}
}
