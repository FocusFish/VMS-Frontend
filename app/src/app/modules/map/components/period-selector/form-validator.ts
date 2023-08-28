import { UntypedFormGroup, UntypedFormControl, FormArray, Validators } from '@angular/forms';
import { MobileTerminalTypes } from '@data/mobile-terminal';
import CustomValidators from '@validators/.';
// @ts-ignore
import moment from 'moment-timezone';


export const createPeriodSelectorFormValidator = (): UntypedFormGroup => {
  return new UntypedFormGroup({
    periodLength: new UntypedFormControl(86400000, [Validators.required]),
    to: new UntypedFormControl(moment(), [CustomValidators.momentValid]),
  });
};
