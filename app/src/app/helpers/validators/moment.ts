import { UntypedFormControl } from '@angular/forms';

export const momentValid = (c: UntypedFormControl) => {
  return c.value === null || c.value.isValid() ? null : {
    momentNotValid: true
  };
};

export const momentOnlyInThePast = (c: UntypedFormControl) => {
  return c.value !== null && c.value.format('x') < Date.now() ? null : {
    momentOnlyInThePast: true
  };
};

export const momentNotInTheFuture = (c: UntypedFormControl) => {
  return c.value !== null && c.value.format('x') <= Date.now() ? null : {
    momentInTheFuture: true
  };
};
