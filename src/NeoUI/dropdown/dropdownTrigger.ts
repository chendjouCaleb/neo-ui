import {Directive, ElementRef, Input, TemplateRef} from '@angular/core';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';

@Directive({
  selector: 'DropdownTrigger',
  standalone: true,
  host: {
    '(click)': 'toggle()'
  }
})
export class DropdownTrigger {
  private _isOpen: boolean = false
  get isOpen(): boolean { return false; }

  @Input()
  disableClose: boolean = false;

  @Input()
  templateRef: TemplateRef<any>

  get host(): HTMLElement { return this._elementRef.nativeElement; }

  constructor(private readonly _overlay: Overlay,
              private readonly _elementRef: ElementRef<HTMLElement>) {
  }

  toggle() {

  }

  open() {
    this._overlay.create(this.getOverlayConfig())
  }

  close() {

  }


  private getOverlayConfig() : OverlayConfig {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this.host)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        }
      ]);

    const scrollStrategy = this._overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'my-dropdown-panel'
    });
  }
}
