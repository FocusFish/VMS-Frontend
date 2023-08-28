import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NotesTypes } from '@data/notes';

export const createManualPollFormValidator = () => {
  return new UntypedFormGroup({
    comment: new UntypedFormControl('', [Validators.required, Validators.maxLength(255)]),
    from: new UntypedFormControl(),
    to: new UntypedFormControl(),
    frequencyHours: new UntypedFormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(0)]),
    frequencyMinutes: new UntypedFormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(0)]),
  });
};
