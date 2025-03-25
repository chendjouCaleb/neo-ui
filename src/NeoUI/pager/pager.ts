import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild, Injector, Input,
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
    'class': 'my-pager',
    '[style.height.px]': '_height'
  }
})
export class Pager implements AfterViewInit {
  private _initialized = false;
  _pages: { [key: number]: PagerContainer } = {}

  @ContentChild(PagerTemplateDef)
  templateRef: PagerTemplateDef

  @ViewChild(CdkPortalOutlet)
  _portalOutlet: CdkPortalOutlet

  _height: number


  @Input()
  set currentIndex(index: number) {
    if(this._initialized) {
      this.activatePage(index)
    }else {
      this._currentIndex = index
    }
  }
  get currentIndex(): number {
    return this._currentIndex;
  }

  private _currentIndex: number = 0;
  private _lastActiveIndex: number | null = null;

  private _currentPage: PagerContainer

  constructor(private _injector: Injector, private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.activatePage(this._currentIndex)
    this._initialized = true
  }

  activatePage(index: number) {

    if (this._currentPage) {
      this._currentPage.startExitAnimation()
      this._lastActiveIndex = this._currentIndex;
    }

    const pageContext = {index}
    this._currentPage = this._getOrCreateContainer(pageContext);
    const dir = index > this._lastActiveIndex ? 'rtl' : 'ltr';
    if (this._lastActiveIndex === -1) {
      this._currentPage.markAsActive()
    } else {
      this._currentPage.startEnterAnimation(dir);
    }

    setTimeout(() => {
      this._height = this._currentPage.host.getBoundingClientRect().height
      console.log(this._height)
    }, 0)
    this._currentIndex = index;
  }

  private _getOrCreateContainer(pageContext: PageContext): PagerContainer {
    if (this._pages[pageContext.index]) {
      return this._pages[pageContext.index];
    } else {
      const container = this._attachPageContainer(pageContext);
      this._pages[pageContext.index] = container;
      return container;
    }
  }

  private _attachPageContainer(pageContext: PageContext): PagerContainer {
    const injector = Injector.create({
      parent: this._injector,
      providers: [
        {provide: Pager, useValue: this},
        {provide: PageContext, useValue: pageContext}
      ]
    });

    const containerPortal = new ComponentPortal(PagerContainer, null!, injector);

    const containerRef = this._portalOutlet.attachComponentPortal(containerPortal);
    const templatePortal = new TemplatePortal(this.templateRef.template, null!, pageContext);
    containerRef.instance.attachTemplatePortal(templatePortal);

    return containerRef.instance
  }


  next() {
    this.activatePage(this._currentIndex + 1)
  }

  prev() {
    this.activatePage(this._currentIndex - 1)

  }

  pushBack() {

  }

  goTo(index: number) {

  }
}
