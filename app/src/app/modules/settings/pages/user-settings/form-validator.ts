import { UntypedFormGroup, UntypedFormControl, FormArray, Validators } from '@angular/forms';
import { MapSettingsTypes } from '@data/map-settings';
import { UserSettingsTypes } from '@data/user-settings';
import CustomValidators from '@validators/.';

export const createUserSettingsFormValidator = (
  mapSettings: MapSettingsTypes.Settings,
  userSettings: UserSettingsTypes.State
): UntypedFormGroup => {
  return new UntypedFormGroup({
    mapSettings: new UntypedFormGroup({
      flagsVisible: new UntypedFormControl(mapSettings.flagsVisible),
      tracksVisible: new UntypedFormControl(mapSettings.tracksVisible),
      namesVisible: new UntypedFormControl(mapSettings.namesVisible),
      speedsVisible: new UntypedFormControl(mapSettings.speedsVisible),
      forecastsVisible: new UntypedFormControl(mapSettings.forecastsVisible),
      unitOfDistance: new UntypedFormControl(mapSettings.unitOfDistance),
      mapStartPosition: new UntypedFormGroup({
        startZoomLevel: new UntypedFormControl(mapSettings.startZoomLevel, [
          Validators.required,
          Validators.min(0),
          Validators.max(19)
        ]),
        latitude: new UntypedFormControl(mapSettings.startPosition.latitude, [Validators.required]),
        longitude: new UntypedFormControl(mapSettings.startPosition.longitude, [Validators.required]),
      }),
      mapLimits: new UntypedFormGroup({
        tracksMinuteCap: new UntypedFormControl('' + mapSettings.tracksMinuteCap),
        forecastInterval: new UntypedFormControl(mapSettings.forecastInterval, [Validators.required]),
      }),
      assetColorMethod: new UntypedFormControl(mapSettings.assetColorMethod),
      autoHelp: new UntypedFormControl(mapSettings.autoHelp),
    }),
    userSettings: new UntypedFormGroup({
      experimentalFeaturesEnabled: new UntypedFormControl(userSettings.experimentalFeaturesEnabled),
    }),
  });
};
