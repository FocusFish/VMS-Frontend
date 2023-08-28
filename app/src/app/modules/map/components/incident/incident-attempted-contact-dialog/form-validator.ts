import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import CustomValidators from '@validators/.';

export const createAttemptedContactFormValidator = () => {
  return new UntypedFormGroup({
    note: new UntypedFormControl('', [Validators.required]),
  });
};
