import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ContactTypes } from '@data/contact';
import CustomValidators from '@validators/.';

export const createContactFormValidator = (contact: ContactTypes.Contact) => {
  return new UntypedFormGroup({
    essentailFields: new UntypedFormGroup({
      name: new UntypedFormControl(contact.name, Validators.required),
      type: new UntypedFormControl(contact.type, Validators.required),
    }),
    contact: new UntypedFormGroup({
      email: new UntypedFormControl(contact.email, CustomValidators.validateEmail),
      phone: new UntypedFormControl(contact.phoneNumber, CustomValidators.phoneNumber),
    }),
    address: new UntypedFormGroup({
      country: new UntypedFormControl(contact.country),
      city: new UntypedFormControl(contact.cityName),
      street: new UntypedFormControl(contact.streetName),
      postOfficeBox: new UntypedFormControl(contact.postOfficeBox),
      postalArea: new UntypedFormControl(contact.postalArea),
      zipCode: new UntypedFormControl(contact.zipCode),
    }),
    other: new UntypedFormGroup({
      nationality: new UntypedFormControl(contact.nationality),
      owner: new UntypedFormControl(contact.owner),
      source: new UntypedFormControl(contact.source),
    }),
  });
};
