import {Component, ComponentRef, EmbeddedViewRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {CdkPortalOutlet, ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';

@Component({
  template: `
    <ng-template cdkPortalOutlet></ng-template>`,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CdkPortalOutlet
  ],
  host: {
    'class': 'my-pager-page-container'
  }
})
export class PagerContainer {

  @ViewChild(CdkPortalOutlet, {static: true})
  _portalHost: CdkPortalOutlet;

  protected _attachedPortal: Portal<any>;

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._attachedPortal = portal;
    return this._portalHost.attachTemplatePortal(portal)
  }
}
