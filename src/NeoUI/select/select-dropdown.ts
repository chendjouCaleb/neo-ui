import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {CdkPortal} from '@angular/cdk/portal';

@Component({
  selector: 'SelectDropdown',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template cdkPortal class="my-select-dropdown-container">
      <ng-content></ng-content>
    </ng-template>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkPortal
  ],
  host: {
    class: 'my-select-dropdown',
  }

})
export class SelectDropdown {
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
    console.log("State: ", this._visible)
  }
  get visible(): boolean { return this._visible }
  private _visible: boolean = false


  constructor(private overlay: Overlay) {}

  ngAfterViewInit() {
    this.initialized = true;

  }

  public open(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.overlayRef.addPanelClass('my-select-dropdown-panel')
    this.overlayRef.overlayElement.style.width = this.trigger.offsetWidth + 'px'
    this.overlayRef.backdropClick().subscribe(() => {
      this.close()
    });
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
      panelClass: 'my-select-dropdown-panel'
    });
  }


}
