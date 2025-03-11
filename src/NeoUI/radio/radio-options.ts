import {InjectionToken} from '@angular/core';

export interface MyRadioDefaultOptions {
  color: string;
}

export const MY_RADIO_DEFAULT_OPTIONS =
  new InjectionToken<MyRadioDefaultOptions>('my-radio-default-options', {
    providedIn: 'root',
    factory: MY_RADIO_DEFAULT_OPTIONS_FACTORY
  });

export function MY_RADIO_DEFAULT_OPTIONS_FACTORY(): MyRadioDefaultOptions {
  return {
    color: 'primary'
  };
}
