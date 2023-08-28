import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NotesTypes } from '@data/notes';
import CustomValidators from '@validators/.';
// @ts-ignore
import moment from 'moment-timezone';

export const createManualMovementFormValidator = () => {
  return new UntypedFormGroup({
    latitude: new UntypedFormControl(null, [Validators.required, Validators.min(0), Validators.max(90)]),
    latitudeMinute: new UntypedFormControl(null, [Validators.required, Validators.min(0), Validators.max(59)]),
    latitudeDecimals: new UntypedFormControl(null, [Validators.required, Validators.min(0)]),
    latitudeDirection: new UntypedFormControl('N', [Validators.required]),
    longitude: new UntypedFormControl(null, [Validators.required, Validators.min(0), Validators.max(180)]),
    longitudeMinute: new UntypedFormControl(null, [Validators.required, Validators.min(0), Validators.max(59)]),
    longitudeDecimals: new UntypedFormControl(null, [Validators.required, Validators.min(0)]),
    longitudeDirection: new UntypedFormControl('E', [Validators.required]),
    speed: new UntypedFormControl(null, [Validators.min(0), Validators.max(40)]),
    heading: new UntypedFormControl(null, [Validators.min(0), Validators.max(360)]),
    timestamp: new UntypedFormControl(moment(), [CustomValidators.momentValid, CustomValidators.momentNotInTheFuture]),
    note: new UntypedFormControl('', [Validators.required]),
  });
};
