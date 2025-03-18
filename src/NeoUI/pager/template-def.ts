import {Directive, TemplateRef} from '@angular/core';

export class PageContext {
  index: number
}

@Directive({
  selector: '[MyPagerTemplateDef]',
  standalone: true
})
export class PagerTemplateDef {
  constructor(public template: TemplateRef<PageContext>) {}
}
