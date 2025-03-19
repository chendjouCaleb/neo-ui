import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {MS_MOTION_SLIDE_LTR_IN, MS_MOTION_SLIDE_RTL_IN, MsMotionSlideDir} from '../motion';
import {MsMotionFunction} from '../horizontal-pager/pager-motion';
import {Observable, Subject} from 'rxjs';
import {PageContext} from './template-def';

@Component({
  template: `
    <ng-template cdkPortalOutlet></ng-template>`,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CdkPortalOutlet
  ],
  host: {
    'class': 'my-pager-page-container',
    '[class.active]': '_isActive',
    '[class.hidden]': '!_isActive'
  }
})
export class PagerContainer {

  @ViewChild(CdkPortalOutlet, {static: true})
  _portalHost: CdkPortalOutlet;

  protected _attachedPortal: Portal<any>;

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  _isActive: boolean

  /** Tells if the container is new. It will be false after the first enter animation. */
  _pristine: boolean

  /** Subject for notifying the user that the dialog has finished opening. */
  private readonly _afterOpened = new Subject<PageContext>();
  get afterOpened(): Observable<PageContext> {
    return this._afterOpened.asObservable()
  }

  /** Subject for notifying the user that the dialog has finished closing. */
  private readonly _afterClosed = new Subject<PageContext>();
  get afterOpenedClosed(): Observable<PageContext> {
    return this._afterClosed.asObservable()
  }

  private readonly _afterCreated = new Subject<PageContext>();
  get afterCreated(): Observable<PageContext> {
    return this._afterCreated.asObservable()
  }

  constructor(private _elementRef: ElementRef<HTMLElement>,
              public _changeDetectorRef: ChangeDetectorRef,
              public readonly context: PageContext) {
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._attachedPortal = portal;
    return this._portalHost.attachTemplatePortal(portal)
  }


  markAsActive() {
    this._isActive = true;
    this._changeDetectorRef.markForCheck()
  }

  startEnterAnimation(dir: MsMotionSlideDir) {
    this._isActive = true;
    this._changeDetectorRef.markForCheck();

    const keyframes = dir === 'ltr' ? MS_MOTION_SLIDE_LTR_IN : MS_MOTION_SLIDE_RTL_IN;
    const animation = this.host.animate(keyframes, {duration: 300, delay: 0, easing: 'ease-in-out'});
    animation.onfinish = () => {
      if(!this._pristine) {
        this._afterCreated.next(this.context)
        this._pristine = true
      }
      this._afterOpened.next(this.context)
    }
  }

  startExitAnimation() {


    const keyframes = [
      {transform: 'scale3d(1, 1, 1)', opacity: 1},
      {transform: 'scale3d(0.9, 0.9, 1)', opacity: 0}
    ];
    const animation = this.host.animate(keyframes, {duration: 200});
    animation.onfinish = () => {
      this._isActive = false
      this._changeDetectorRef.markForCheck();
      this._afterClosed.next(this.context)
    }
  }
}
