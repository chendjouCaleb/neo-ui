import {InjectionToken} from '@angular/core';

export type MyButtonShape = 'rounded' | 'circular' | 'square'

export interface MyButtonDefaultOptions {
  color: string,
  shape: MyButtonShape
}

export const MY_BUTTON_DEFAULT_OPTIONS =
  new InjectionToken<MyButtonDefaultOptions>('my-button-default-options', {
    providedIn: 'root',
    factory: MY_BUTTON_DEFAULT_OPTIONS_FACTORY
  });

export function MY_BUTTON_DEFAULT_OPTIONS_FACTORY(): MyButtonDefaultOptions {
  return {
    color: 'primary',
    shape: 'circular'
  };
}
