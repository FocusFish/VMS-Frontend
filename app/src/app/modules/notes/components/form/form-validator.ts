import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NotesTypes } from '@data/notes';

export const createNotesFormValidator = (note: NotesTypes.Note) => {
  return new UntypedFormGroup({
    essentailFields: new UntypedFormGroup({
      note: new UntypedFormControl(note.note, [Validators.required]),
    }),
  });
};
