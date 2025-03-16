import {ComponentRef, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {TooltipPanel} from './tooltip-panel';
import {TooltipPosition} from '../toolttip-position';


export interface BeakPosition {
  x: number,
  y: number
}

@Directive({
  selector: '[MyTooltip]',
  standalone: true,

  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': '_mouseleave($event)'
  }
})
export class Tooltip implements OnInit {

  /**
   * Disables the display of the tooltip.
   */
  @Input('MyTooltipDisabled')
  disabled: boolean = false;

  /** The message to be displayed in the tooltip. */
  @Input('MyTooltip')
  message: string = ''

  /** Allows the user to define the position of the tooltip relative to the parent element. */
  @Input('MyTooltipPosition')
  position: TooltipPosition

  /** The default delay in ms before hiding the tooltip after hide is called. */
  @Input('MyTooltipHideDelay')
  hideDelay: number

  /** The default delay in ms before showing the tooltip after show is called. */
  @Input('MyTooltipShowDelay')
  showDelay: number

  /** Classes to be passed to the tooltip. Supports the same syntax as ngClass. */
  @Input('MyTooltipClass')
  tooltipClass: any = []

  private _componentRef: ComponentRef<TooltipPanel>
  private _overlayRef: OverlayRef

  beakPosition: BeakPosition = {x: 0, y: 0}

  constructor(private elementRef: ElementRef<HTMLElement>,
              private overlay: Overlay) {
  }

  ngOnInit() {

  }

  /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input. */
  show(delay: number = this.showDelay) {
    if(this._overlayRef && this._overlayRef.hasAttached()) {
      return
    }
    const positionStrategy = this.getPositionStrategy()
    const overlayConfig: OverlayConfig = {
      disposeOnNavigation: true,
      hasBackdrop: false,
      panelClass: ['my-tooltip-panel', ...this.tooltipClass],
      positionStrategy
    }
    const panel = new ComponentPortal(TooltipPanel);


    this._overlayRef = this.overlay.create(overlayConfig);

    this._componentRef = this._overlayRef.attach(panel);
    this._componentRef.instance.message = this.message;
    //this._componentRef.instance.position = this.position;

    this._overlayRef.overlayElement.addEventListener('mouseleave', (event: MouseEvent) => {
      if(!this.elementRef.nativeElement.contains(event.relatedTarget as Node)) {
        this.hide()
      }
    })

    positionStrategy.positionChanges.subscribe(value => {

    })
  }

  /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input. */
  hide(delay: number = this.hideDelay) {
    this._overlayRef.detach()
  }


  _mouseleave(event: MouseEvent) {
    // console.log(this._overlayRef.overlayElement)
    // console.log(event.relatedTarget)
    // console.log(this._overlayRef.hostElement.contains(event.relatedTarget as Node))
    if (!this._overlayRef.hostElement.contains(event.relatedTarget as Node))
    {

      this.hide()
      console.log('hide:  ' + this._overlayRef.hasAttached())
    }
  }

  getPositionStrategy(): FlexibleConnectedPositionStrategy {
    let connectedPosition: ConnectedPosition[] = [bottomPosition, topPosition];
    // if (this.position === 'left') {
    //   connectedPosition = [leftPosition, rightPosition];
    // } else if (this.position === 'top') {
    //   connectedPosition = [topPosition, bottomPosition]
    // } else if (this.position === 'right') {
    //   connectedPosition = [rightPosition, leftPosition]
    // }
    return this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(connectedPosition);
  }
}

const bottomPosition: ConnectedPosition = {
  originX: 'center',
  overlayX: 'center',
  originY: 'bottom',
  overlayY: 'top',
  panelClass: 'my-tooltip-panel-bottom'
};

const topPosition: ConnectedPosition = {
  originX: 'center',
  overlayX: 'center',
  originY: 'top',
  overlayY: 'bottom',
  panelClass: 'my-tooltip-panel-top'
}

const leftPosition: ConnectedPosition = {
  originX: 'start',
  overlayX: 'end',
  originY: 'center',
  overlayY: 'center',
  panelClass: 'my-tooltip-panel-start'
}

const rightPosition: ConnectedPosition = {
  originX: 'end',
  overlayX: 'start',
  originY: 'center',
  overlayY: 'center',
  panelClass: 'my-tooltip-panel-end'
}
