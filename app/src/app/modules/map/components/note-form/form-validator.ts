import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NotesTypes } from '@data/notes';

export const createNotesFormValidator = () => {
  return new UntypedFormGroup({
    note: new UntypedFormControl('', [Validators.required]),
  });
};
