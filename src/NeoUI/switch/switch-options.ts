import {InjectionToken} from '@angular/core';

export interface MySwitchDefaultOptions {
  color: string
}

export const MY_SWITCH_DEFAULT_OPTIONS =
  new InjectionToken<MySwitchDefaultOptions>('my-switch-default-options', {
    providedIn: 'root',
    factory: MY_SWITCH_DEFAULT_OPTIONS_FACTORY
  });

export function MY_SWITCH_DEFAULT_OPTIONS_FACTORY(): MySwitchDefaultOptions {
  return {
    color: 'primary'
  };
}
