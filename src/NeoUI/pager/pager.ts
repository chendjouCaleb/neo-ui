import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild, Injector,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {PagerContainer} from './pager-container';
import {PageContext, PagerTemplateDef} from './template-def';
import {CdkPortalOutlet, ComponentPortal, TemplatePortal} from '@angular/cdk/portal';

export class PagerChange {
  constructor(public readonly pager: Pager,) {
  }
}

@Component({
  selector: 'MyPager',
  templateUrl: 'pager.html',
  styleUrl: 'pager.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CdkPortalOutlet
  ],
  host: {
    'class': 'my-pager'
  }
})
export class Pager implements AfterViewInit {
  _pages: PagerContainer[] = [];

  @ContentChild(PagerTemplateDef)
  templateRef: PagerTemplateDef

  @ViewChild(CdkPortalOutlet)
  _portalOutlet: CdkPortalOutlet

  get currentIndex(): number { return this._currentIndex; }
  private _currentIndex: number = 0;
  private _lastActiveIndex: number = -1;

  constructor(private _injector: Injector) {
  }

  ngAfterViewInit() {
    this.activatePage(this._currentIndex)
  }

  activatePage(index: number) {
    const pageContext = { index }
    const container = this._attachPageContainer(pageContext);

    const templatePortal = new TemplatePortal(this.templateRef.template, null!, pageContext);
    container.attachTemplatePortal(templatePortal);
    this._currentIndex = index;
  }

  private _attachPageContainer(pageContext: PageContext) : PagerContainer {
    const injector = Injector.create({
      parent: this._injector,
      providers: [
        {provide: Pager, useValue: this},
        {provide: PageContext, useValue: pageContext}
      ]
    });

    const containerPortal = new ComponentPortal(PagerContainer, null!, injector);
    const containerRef = this._portalOutlet.attachComponentPortal(containerPortal);
   // this._portalOutlet.detach()
    return containerRef.instance;
  }

  next() {
    this.activatePage(this._currentIndex + 1)
  }

  prev() {
    if(this._currentIndex > 0)
      this.activatePage(this._currentIndex - 1)
  }

  pushBack() {

  }

  goTo(index: number) {

  }
}
