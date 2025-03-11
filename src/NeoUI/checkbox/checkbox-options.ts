import {InjectionToken} from '@angular/core';

export interface MyCheckboxDefaultOptions {
  color: string
}

export const MY_CHECKBOX_DEFAULT_OPTIONS =
  new InjectionToken<MyCheckboxDefaultOptions>('my-checkbox-default-options', {
    providedIn: 'root',
    factory: MY_CHECKBOX_DEFAULT_OPTIONS_FACTORY
  });

export function MY_CHECKBOX_DEFAULT_OPTIONS_FACTORY(): MyCheckboxDefaultOptions {
  return {
    color: 'primary'
  };
}
