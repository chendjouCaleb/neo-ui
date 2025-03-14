import {Component, ComponentRef, EmbeddedViewRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  DomPortal,
  Portal,
  TemplatePortal
} from '@angular/cdk/portal';

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
export class PopoverContainer {
  @ViewChild(CdkPortalOutlet, {static: true})
  _portalHost: CdkPortalOutlet;

  constructor() {
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

}
