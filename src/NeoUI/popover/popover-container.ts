import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EmbeddedViewRef, EventEmitter, Inject,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {POPOVER_TRIGGER, PopoverOptions} from './popover-options';
import {ConnectionPositionPair, FlexibleConnectedPositionStrategy, OverlayRef} from '@angular/cdk/overlay';
import {myPopoverAnimations} from './popover-animations';
import {FocusOrigin} from '@angular/cdk/a11y';
import {AnimationEvent} from '@angular/animations';

export interface BeakPosition {
  start?: number,
  end?: number,
  top?: number,
  bottom?: number,

}

/** Event that captures the state of dialog container animations. */
interface PopoverAnimationEvent {
  state: 'opened' | 'opening' | 'closing' | 'closed';
  totalTime: number;
}


@Component({
    templateUrl: 'popover-container.html',
    styleUrl: 'popover-container.scss',
    encapsulation: ViewEncapsulation.None,
    animations: [myPopoverAnimations.popoverContainer],
    imports: [
        CdkPortalOutlet
    ],
    host: {
        class: 'my-popover-container',
        'tabindex': '-1',
        'aria-modal': 'true',
        '[id]': '_id',
        '[attr.role]': '_options.role',
        '[attr.aria-labelledby]': '_options.ariaLabel ? null : _ariaLabelledBy',
        '[attr.aria-label]': '_options.ariaLabel',
        '[attr.aria-describedby]': '_options.ariaDescribedBy || null',
        '[@popoverContainer]': '_state',
        '(@popoverContainer.start)': '_onAnimationStart($event)',
        '(@popoverContainer.done)': '_onAnimationDone($event)',
    }
})
export class PopoverContainer implements AfterViewInit {
  /** State of the dialog animation. */
  _state: 'void' | 'enter' | 'exit' = 'enter';

  /** Emits when an animation state changes. */
  _animationStateChanged = new EventEmitter<PopoverAnimationEvent>();

  @ViewChild(CdkPortalOutlet, {static: true})
  _portalHost: CdkPortalOutlet;

  position: ConnectionPositionPair

  beakPosition: BeakPosition = {}

  /** ID for the container DOM element. */
  _id: string;

  /** ID of the element that should be considered as the popover's label. */
  _ariaLabelledBy: string | null;

  /**
   * Type of interaction that led to the dialog being closed. This is used to determine
   * whether the focus style will be applied when returning focus to its original location
   * after the popover is closed.
   */
  _closeInteractionType: FocusOrigin|null = null;

  constructor(public readonly _options: PopoverOptions,
              private _overlayRef: OverlayRef,
              private _changeDetector: ChangeDetectorRef,
              @Inject(POPOVER_TRIGGER) private _trigger: HTMLElement) {


    this._ariaLabelledBy = _options.ariaLabelledBy || null;
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
      }, 0)
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

    if (this.position.originY == 'top' && this.position.overlayY == 'bottom') {

      const start = triggerRect.left + triggerRect.width / 2 - overlayRect.left - this.getBeakWidth() / 2
      this.beakPosition = {bottom: -this.getBeakWidth() / 2 + 1, start: start}
    }

    if (this.position.originY == 'bottom' && this.position.overlayY == 'top') {
      const start = triggerRect.left + triggerRect.width / 2 - overlayRect.left - this.getBeakWidth() / 2
      this.beakPosition = {top: -this.getBeakWidth() / 2 + 1, start: start}
    }

    if (this.position.originX == 'start' && this.position.overlayX == 'end') {
      const top = triggerRect.top + triggerRect.width / 2 - overlayRect.top - this.getBeakWidth() / 2
      this.beakPosition = {top: top, end: -this.getBeakWidth() / 2 + 1}
    }

    if (this.position.originX == 'end' && this.position.overlayX == 'start') {
      const top = triggerRect.top + triggerRect.width / 2 - overlayRect.top - this.getBeakWidth() / 2
      this.beakPosition = {top: top, start: -this.getBeakWidth() / 2 + 1}
    }
  }

  /** Callback, invoked whenever an animation on the host completes. */
  _onAnimationDone({toState, totalTime}: AnimationEvent) {
    if (toState === 'enter') {
      //this._trapFocus();
      this._animationStateChanged.next({state: 'opened', totalTime});
    } else if (toState === 'exit') {
      //this._restoreFocus();
      this._animationStateChanged.next({state: 'closed', totalTime});
    }
  }

  /** Callback, invoked when an animation on the host starts. */
  _onAnimationStart({toState, totalTime}: AnimationEvent) {
    if (toState === 'enter') {
      this._animationStateChanged.next({state: 'opening', totalTime});
    } else if (toState === 'exit' || toState === 'void') {
      this._animationStateChanged.next({state: 'closing', totalTime});
    }
  }

  /** Starts the dialog exit animation. */
  _startExitAnimation(): void {
    this._state = 'exit';

    // Mark the container for check so it can react if the
    // view container is using OnPush change detection.
    this._changeDetector.markForCheck();
  }

  getContentMargin(): number {
    return this._options.beakRadius;
  }

  getBeakTop(): number {
    //return  ((this._options.beakRadius * 2) - this.getBeakWith())/2;
    return -this.getBeakWidth() / 2;
  }
}
