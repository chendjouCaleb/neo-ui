import {
  ComponentType,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import {Injectable, InjectionToken, Injector, StaticProvider, TemplateRef} from '@angular/core';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {PopoverContainer} from './popover-container';
import {PopoverOptions} from './popover-options';
import {PopoverRef} from './popover-ref';
import {Directionality} from '@angular/cdk/bidi';
import {of} from 'rxjs';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const POPOVER_DATA = new InjectionToken<any>('MyPopoverData');


@Injectable({
  providedIn: 'root'
})
export class Popover {
  constructor(private _overlay: Overlay,
              private _injector: Injector) {
  }

  open<T, R>(trigger: HTMLElement,
             content: ComponentType<T> | TemplateRef<T>,
             options: PopoverOptions<any>): PopoverRef<T, R> {

    options = this._applyOptionsDefaults(options);
    const overlayRef = this._createOverlayRef(trigger, options);
    const container = this._attachPopoverContainer(overlayRef, options);
    const popoverRef = this._attachPopoverContainerContent(content, container);



  }


  private _attachPopoverContainerContent<T>(content: ComponentType<T> | TemplateRef<T>,
                                            overlayRef: OverlayRef,
                                            trigger: HTMLElement,
                                            container: PopoverContainer,
                                            options: PopoverOptions): PopoverRef<any> {

    const popoverRef = new PopoverRef<T>(overlayRef, options, trigger)

    if(content instanceof TemplateRef) {
      const context = {$implicit: options.data, popoverRef };
      const templatePortal = new TemplatePortal(content as TemplateRef<T>, null!, <any> context);
      popoverRef.embeddedViewRef = container.attachTemplatePortal(templatePortal);
    }else {
      const injector =this._createInjector<T>(options, popoverRef, container);
      const componentPortal = new ComponentPortal(content, options.viewContainerRef, injector);
      const componentRef = container.attachComponentPortal(componentPortal);
      popoverRef.componentInstance = componentRef.instance
    }

    popoverRef.updateSize()

    return popoverRef;
  }


  private _createInjector<T>(options: PopoverOptions,
                             popoverRef: PopoverRef<T>,
                             container: PopoverContainer): Injector {
    const userInjector = options && options.viewContainerRef && options.viewContainerRef.injector;
    const providers: StaticProvider[] = [
      {provide: POPOVER_DATA, useValue: options.data},
      {provide: PopoverContainer, useValue: container},
      {provide: PopoverRef, useValue: popoverRef}
    ]

    if (options.direction &&
      (!userInjector || !userInjector.get<Directionality | null>(Directionality, null))) {
      providers.push({
        provide: Directionality,
        useValue: {value: options.direction, change: of()}
      });
    }

    return Injector.create({parent: userInjector || this._injector, providers})
  }

  /**
   * Attaches a popover container to a popover's already-created overlay.
   * @param overlayRef Reference to the popover's underlying overlay.
   * @param options The dialog configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
  private _attachPopoverContainer(overlayRef: OverlayRef, options: PopoverOptions): PopoverContainer {
    const userInjector = options && options.viewContainerRef && options.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{provide: PopoverOptions, useValue: options}]
    });

    const containerPortal = new ComponentPortal(PopoverContainer, options.viewContainerRef, injector)
    const containerRef = overlayRef.attach(containerPortal);
    return containerRef.instance
  }

  private _createOverlayRef(trigger: HTMLElement, options: PopoverOptions<any>): OverlayRef {
    let positionStrategy = this.getPosition(trigger)

    const overlayConfig: OverlayConfig = {
      hasBackdrop: options.hasBackdrop,
      minHeight: options.minHeight,
      minWidth: options.minWidth,
      maxHeight: options.maxHeight,
      maxWidth: options.maxWidth,
      direction: options.direction,
      positionStrategy
    }
    if (options.backdropClass) {
      overlayConfig.backdropClass = options.backdropClass
    }

    return this._overlay.create(overlayConfig)
  }

  getPosition(trigger: HTMLElement): FlexibleConnectedPositionStrategy {
    return this._overlay.position()
      .flexibleConnectedTo(trigger)
      .withPositions([{
        originX: 'center',
        overlayX: 'center',
        originY: 'bottom',
        overlayY: 'top',
      }]);
  }


  /**
   * Expands the provided configuration object to include the default values for properties which
   * are undefined.
   */
  private _applyOptionsDefaults(options?: PopoverOptions): PopoverOptions {
    return {...new PopoverOptions(), ...options};
  }
}
