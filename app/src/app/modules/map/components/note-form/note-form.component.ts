import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { NotesTypes } from '@data/notes';
import { createNotesFormValidator } from './form-validator';
import { errorMessage } from '@app/helpers/validators/error-messages';

@Component({
    selector: 'map-note-form',
    templateUrl: './note-form.component.html',
    styleUrls: ['./note-form.component.scss'],
    standalone: false
})
export class NoteFormComponent implements OnInit {
  @Input() createNote: (note: NotesTypes.NoteParameters) => void;
  @Input() assetId: string;

  public formValidator: UntypedFormGroup;
  public save = () => {
    return this.createNote({
      note: this.formValidator.value.note as string,
      assetId: this.assetId
    });
  }

  ngOnInit() {
    this.formValidator = createNotesFormValidator();
  }

  getErrors(path: string[]) {
    const errors = this.formValidator.get(path).errors;
    return errors === null ? [] : Object.keys(errors);
  }

  errorMessage(error: string) {
    // if(error === 'maxlength') {
    //   return 'Text can not be longer then 255 characters.';
    // }

    return errorMessage(error);
  }
}
