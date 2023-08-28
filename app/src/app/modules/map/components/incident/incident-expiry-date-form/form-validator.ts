import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import CustomValidators from '@validators/.';

export const createIncidentExpiryDateFormValidator = () => {
  return new UntypedFormGroup({
    expiryDate: new UntypedFormControl(null, [CustomValidators.momentValid]),
    note: new UntypedFormControl('', [Validators.required]),
  });
};
