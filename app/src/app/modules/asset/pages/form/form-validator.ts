import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AssetTypes } from '@data/asset';
import { getName } from 'i18n-iso-countries';

export const createAssetFormValidator = (asset: AssetTypes.Asset) => {
  return new UntypedFormGroup({
    essentailFields: new UntypedFormGroup({
      flagState: new UntypedFormControl(asset.flagStateCode + " " + getName(asset.flagStateCode, 'en'), [Validators.required]),
      externalMarking: new UntypedFormControl(asset.externalMarking, [Validators.required]),
      name: new UntypedFormControl(asset.name, [Validators.required]),
    }),
    identificationFields: new UntypedFormGroup({
      cfr: new UntypedFormControl(asset.cfr),
      ircs: new UntypedFormControl(asset.ircs),
      imo: new UntypedFormControl(asset.imo, [Validators.minLength(7), Validators.maxLength(7), Validators.pattern('[0-9]*')]),
      portOfRegistration: new UntypedFormControl(asset.portOfRegistration),
      mmsi: new UntypedFormControl(asset.mmsi),
      vesselType: new UntypedFormControl(asset.vesselType),
    }),
    metrics: new UntypedFormGroup({
      lengthOverAll: new UntypedFormControl(asset.lengthOverAll),
      lengthBetweenPerpendiculars: new UntypedFormControl(asset.lengthBetweenPerpendiculars),
      grossTonnage: new UntypedFormControl(asset.grossTonnage),
      grossTonnageUnit: new UntypedFormControl(asset.grossTonnageUnit),
      powerOfMainEngine: new UntypedFormControl(asset.powerOfMainEngine),
    }),
    companyInformation: new UntypedFormGroup({
      prodOrgName: new UntypedFormControl(asset.prodOrgName),
      prodOrgCode: new UntypedFormControl(asset.prodOrgCode),
    }),
  });
};
