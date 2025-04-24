import {InjectionToken} from '@angular/core';


export type MyTagAppearance = 'filled' | 'outline';
export type MyTagSize = 'medium' | 'small' | 'extra-small';
export type MyTagShape = 'rounded' | 'circular';

export interface MyTagDefaultOptions {
  appearance: MyTagAppearance,
  size: MyTagSize,
  shape: MyTagShape
}

export const MY_TAG_DEFAULT_OPTIONS =
  new InjectionToken<MyTagDefaultOptions>('my-tag-default-options', {
    providedIn: 'root',
    factory: MY_TAG_DEFAULT_OPTIONS_FACTORY
  });

export function MY_TAG_DEFAULT_OPTIONS_FACTORY(): MyTagDefaultOptions {
  return {
    appearance: 'filled',
    size: 'medium',
    shape: 'rounded'
  };
}
