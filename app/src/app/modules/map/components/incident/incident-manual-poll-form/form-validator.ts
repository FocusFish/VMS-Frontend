import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NotesTypes } from '@data/notes';

export const createManualPollFormValidator = () => {
  return new UntypedFormGroup({
    comment: new UntypedFormControl('', [Validators.required, Validators.maxLength(255)]),
  });
};
