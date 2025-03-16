import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EmbeddedViewRef, Inject,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {POPOVER_TRIGGER, PopoverOptions} from './popover-options';
import {ConnectionPositionPair, FlexibleConnectedPositionStrategy, OverlayRef} from '@angular/cdk/overlay';

export interface BeakPosition {
  start?: number,
  end?: number,
  top?: number,
  bottom?: number,

}

@Component({
  templateUrl: 'popover-container.html',
  styleUrl: 'popover-container.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CdkPortalOutlet
  ],
  host: {
    class: 'my-popover-container'
  }
})
export class PopoverContainer implements AfterViewInit {
  @ViewChild(CdkPortalOutlet, {static: true})
  _portalHost: CdkPortalOutlet;

  position: ConnectionPositionPair

  beakPosition: BeakPosition = {}

  constructor(private _options: PopoverOptions,
              private _overlayRef: OverlayRef,
              private _changeDetector: ChangeDetectorRef,
              @Inject(POPOVER_TRIGGER) private _trigger: HTMLElement) {

  }

  ngAfterViewInit() {
    const positionStrategy = this._overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy
    // this.position = positionStrategy._preferredPositions[0]
    // this.updateBeakPosition()
    // this._changeDetector.detectChanges()

    positionStrategy.positionChanges.subscribe(p => {
      this.position = p.connectionPair
      setTimeout(() => {
        this.updateBeakPosition()
        this._changeDetector.detectChanges()
      }, 10)
    })

  }

  protected _attachedPortal: Portal<any>;

  hasAttached(): boolean {
    throw new Error('Method not implemented.');
  }


  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    this._attachedPortal = portal;
    return this._portalHost.attachComponentPortal(portal)
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._attachedPortal = portal;
    return this._portalHost.attachTemplatePortal(portal)
  }


  getBeakWidth(): number {
    const r = this._options.beakRadius;
    return Math.sqrt(2 * r * r);
  }

  updateBeakPosition() {
    if (!this.position) return
    const triggerRect = this._trigger.getBoundingClientRect()
    const overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
    console.log(this.position)
    if (this.position.originY == 'top' && this.position.overlayY == 'bottom') {

      const start = triggerRect.left + triggerRect.width/2 - overlayRect.left - this.getBeakWidth()/2
        this.beakPosition = {bottom: -this.getBeakWidth() / 2, start: start}
    }

    if (this.position.originY == 'bottom' && this.position.overlayY == 'top') {
      const start = triggerRect.left + triggerRect.width/2 - overlayRect.left - this.getBeakWidth()/2
      this.beakPosition = {top: -this.getBeakWidth() / 2, start: start}
    }

    if (this.position.originX == 'start' && this.position.overlayX == 'end') {
      const top = triggerRect.top + triggerRect.width/2 - overlayRect.top - this.getBeakWidth()/2
      this.beakPosition = {top: top, end: -this.getBeakWidth() / 2}
    }

    if (this.position.originX == 'end' && this.position.overlayX == 'start') {
      const top = triggerRect.top + triggerRect.width/2 - overlayRect.top - this.getBeakWidth()/2
      this.beakPosition = {top: top, start: -this.getBeakWidth() / 2}
    }
  }

  getContentMargin(): number {
    return this._options.beakRadius;
  }

  getBeakTop(): number {
    //return  ((this._options.beakRadius * 2) - this.getBeakWith())/2;
    return -this.getBeakWidth() / 2;
  }
}
