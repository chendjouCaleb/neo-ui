import {ComponentType, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {Inject, Injectable, Injector, Optional, StaticProvider, TemplateRef} from '@angular/core';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {Directionality} from '@angular/cdk/bidi';
import {of} from 'rxjs';
import {TOAST_DATA, TOAST_DEFAULT_OPTIONS, ToastOptions} from './toast-options';
import {ToastRef} from './toast-ref';
import {ToastContainer} from './toast-container';
import {ToastStack} from './toast-stack';
import {TextOnlyToast, TextOnlyToastOptions} from './TextOnlyToast';

@Injectable({
  providedIn: 'root'
})
export class Toast {

  private _toastStack: ToastStack

  constructor(private _overlay: Overlay,
              private _injector: Injector,
              @Optional() @Inject(TOAST_DEFAULT_OPTIONS) private _defaultOptions: ToastOptions) {
    this._toastStack = new ToastStack(_overlay)
  }

  open<T, R>(content: ComponentType<T> | TemplateRef<T>,
             options: ToastOptions<any>): ToastRef<T, R> {

    options = this._applyOptionsDefaults(options);

    const overlayRef = this._createOverlayRef(options);
    const container = this._attachToastContainer(overlayRef, options);
    const toastRef = this._attachToastContainerContent(content, overlayRef,
      container, options);

    this._toastStack.addToast(toastRef);

    toastRef.afterClosed().subscribe(() => {
      this._toastStack.removeToast(toastRef);
    });
    if (options.duration) {
      toastRef._closeTimeoutId = setTimeout(() => {
        toastRef.close()
      }, options.duration)
    }
    return toastRef
  }

  show(options: TextOnlyToastOptions, duration: number = 5000): ToastRef<TextOnlyToast> {
    return this.open(TextOnlyToast, {duration, data: options});
  }


  private _attachToastContainerContent<T>(content: ComponentType<T> | TemplateRef<T>,
                                          overlayRef: OverlayRef,
                                          container: ToastContainer,
                                          options: ToastOptions): ToastRef<any> {

    const toastRef = new ToastRef<T>(overlayRef, options, container)

    if (content instanceof TemplateRef) {
      const context = {$implicit: options.data, toastRef};
      const templatePortal = new TemplatePortal(content as TemplateRef<T>, null!, <any>context);
      toastRef.embeddedViewRef = container.attachTemplatePortal(templatePortal);
    } else {
      const injector = this._createInjector<T>(options, toastRef, container);
      const componentPortal = new ComponentPortal(content, options.viewContainerRef, injector);
      const componentRef = container.attachComponentPortal(componentPortal);
      toastRef.componentInstance = componentRef.instance
    }

    toastRef.updateSize()

    return toastRef;
  }


  private _createInjector<T>(options: ToastOptions,
                             toastRef: ToastRef<T>,
                             container: ToastContainer): Injector {
    const userInjector = options && options.viewContainerRef && options.viewContainerRef.injector;
    const providers: StaticProvider[] = [
      {provide: TOAST_DATA, useValue: options.data},
      {provide: ToastContainer, useValue: container},
      {provide: ToastRef, useValue: toastRef}
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
   * Attaches a toast container to a toast's already-created overlay.
   * @param overlayRef Reference to the toast's underlying overlay.
   * @param options The dialog configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
  private _attachToastContainer(overlayRef: OverlayRef, options: ToastOptions): ToastContainer {
    const userInjector = options && options.viewContainerRef && options.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [
        {provide: ToastOptions, useValue: options},
        {provide: OverlayRef, useValue: overlayRef}
      ]
    });

    const containerPortal = new ComponentPortal(ToastContainer, options.viewContainerRef, injector)
    const containerRef = overlayRef.attach(containerPortal);
    return containerRef.instance
  }

  private _createOverlayRef(options: ToastOptions<any>): OverlayRef {
    let positionStrategy = this._overlay.position().global().bottom('8px').end('8px')

    const overlayConfig: OverlayConfig = {
      hasBackdrop: false,
      minHeight: options.minHeight,
      minWidth: options.minWidth,
      maxHeight: options.maxHeight,
      maxWidth: options.maxWidth,
      direction: options.direction,
      positionStrategy
    }

    return this._overlay.create(overlayConfig)
  }

  /**
   * Expands the provided configuration object to include the default values for properties which
   * are undefined.
   */
  private _applyOptionsDefaults(options?: ToastOptions): ToastOptions {
    const defaultOptions = this._defaultOptions || new ToastOptions()
    return {...defaultOptions, ...options};
  }
}
