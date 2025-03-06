import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Directive,
  ElementRef, Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {TimetableItemDescriptor} from './timetable-item-descriptor';

export class TimetableItemDefContext {
  descriptor: TimetableItemDescriptor
}

@Directive({
  standalone: true,
  selector: '[TimetableItemDef]'
})
export class TimetableItemDef {
  contentCache: ComponentRef<TimetableItem>

  constructor(public template: TemplateRef<TimetableItemDefContext>) {}
}



@Component({
  template: `<ng-container #element></ng-container>`,
  selector: 'TimetableItem',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    'class': 'timetable-item'
  }
})
export class TimetableItem implements AfterViewInit {

  @ViewChild('element', {read: ViewContainerRef})
  view: ViewContainerRef;

  @Input()
  context: TimetableItemDescriptor

  @Input()
  contentDef: TimetableItemDef

  constructor(private _elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit(): void {
    this.view.clear();
    this.view.createEmbeddedView(this.contentDef.template, { descriptor: this.context}, 0);
  }
}
