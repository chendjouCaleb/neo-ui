import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ComponentRef, ElementRef, EmbeddedViewRef,
  EventEmitter,
  Inject,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {myToastAnimations} from './toast-animations';
import {CdkPortalOutlet, ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {ConnectionPositionPair, FlexibleConnectedPositionStrategy, OverlayRef} from '@angular/cdk/overlay';
import {FocusOrigin} from '@angular/cdk/a11y';
import {AnimationEvent} from '@angular/animations';
import {ToastOptions} from './toast-options';


/** Event that captures the state of dialog container animations. */
interface ToastAnimationEvent {
  state: 'opened' | 'opening' | 'closing' | 'closed';
  totalTime: number;
}


@Component({
  templateUrl: 'toast-container.html',
  styleUrl: 'toast-container.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  animations: [ myToastAnimations.toastContainer ],
  imports: [
    CdkPortalOutlet
  ],
  host: {
    'class': 'my-toast-container',
    'tabindex': '-1',
    'aria-modal': 'true',
    '[id]': '_id',
    '[attr.role]': '_options.role',
    '[attr.aria-labelledby]': '_options.ariaLabel ? null : _ariaLabelledBy',
    '[attr.aria-label]': '_options.ariaLabel',
    '[attr.aria-describedby]': '_options.ariaDescribedBy || null',
    '[@toastContainer]':'_state',
    '(@toastContainer.start)': '_onAnimationStart($event)',
    '(@toastContainer.done)': '_onAnimationDone($event)',
    '[style.transform]': 'transform'
  }
})
export class ToastContainer implements AfterViewInit {
  /** State of the dialog animation. */
  _state: 'void' | 'enter' | 'exit' = 'enter';

  /** Emits when an animation state changes. */
  _animationStateChanged = new EventEmitter<ToastAnimationEvent>();

  @ViewChild(CdkPortalOutlet, {static: true})
  _portalHost: CdkPortalOutlet;

  position: ConnectionPositionPair



  /** ID for the container DOM element. */
  _id: string;

  /** ID of the element that should be considered as the toast's label. */
  _ariaLabelledBy: string | null;

  /**
   * Type of interaction that led to the dialog being closed. This is used to determine
   * whether the focus style will be applied when returning focus to its original location
   * after the toast is closed.
   */
  _closeInteractionType: FocusOrigin|null = null;

  _translateY: number = 0
  get transform(): string { return `translateY(${this._translateY}px)`}

  constructor(public readonly _options: ToastOptions,
              private _overlayRef: OverlayRef,
              public _changeDetector: ChangeDetectorRef,
              public _elementRef: ElementRef<HTMLElement>) {


    this._ariaLabelledBy = _options.ariaLabelledBy || null;
  }


  ngAfterViewInit() {
    const positionStrategy = this._overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy
    // this.position = positionStrategy._preferredPositions[0]
    // this.updateBeakPosition()
    // this._changeDetector.detectChanges()

    // positionStrategy.positionChanges.subscribe(p => {
    //   this.position = p.connectionPair
    //   setTimeout(() => {
    //            this._changeDetector.detectChanges()
    //   }, 0)
    // })

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



}
