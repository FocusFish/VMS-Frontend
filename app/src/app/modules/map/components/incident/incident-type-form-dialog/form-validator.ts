import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import CustomValidators from '@validators/.';

export const createIncidentTypeFormValidator = (type: string) => {
  return new UntypedFormGroup({
    expiryDate: new UntypedFormControl(),
    type: new UntypedFormControl(type, [Validators.required]),
    note: new UntypedFormControl('', [Validators.required]),
  });
};
