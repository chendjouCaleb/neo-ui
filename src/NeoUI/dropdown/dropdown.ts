import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';

@Component({
  templateUrl: 'dropdown.html',
  selector: 'Dropdown',
  standalone: true,
  styleUrl: 'dropdown.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    CdkPortal
  ],
  host: {
    'class': 'dropdown'
  }
})
export class Dropdown implements AfterViewInit {
  private  overlayRef!: OverlayRef;
  private initialized: boolean = false;

  @ViewChild(CdkPortal)
  public  contentTemplate!: CdkPortal;

  @Input()
  trigger: HTMLElement

  @Input()
  set visible(state: boolean) {
    if (state && !this._visible) {
      this.open()
    }

    if(!state && this._visible) {
      this.close()
    }
  }
  get visible(): boolean { return this._visible }
  private _visible: boolean = false

  @Output()
  readonly onBackdropClick: EventEmitter<void> = new EventEmitter();


  constructor(private overlay: Overlay) {}

  ngAfterViewInit() {
    this.initialized = true;

  }

  public open(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    // this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.onBackdropClick.emit());
    this._visible = true;
  }

  close() {
    if(!this._visible)
      return
    this.overlayRef.detach();
    this._visible = false
  }

  private getOverlayConfig() : OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger)
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

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'dropdown-panel'
    });
  }
}
