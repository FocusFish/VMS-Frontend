import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NotesTypes } from '@data/notes';

export const createIncidentStatusFormValidator = (status: string) => {
  return new UntypedFormGroup({
    status: new UntypedFormControl(status, [Validators.required, Validators.maxLength(255)]),
  });
};
