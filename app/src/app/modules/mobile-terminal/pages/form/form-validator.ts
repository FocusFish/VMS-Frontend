import { UntypedFormGroup, UntypedFormControl, UntypedFormArray, Validators, AbstractControl } from '@angular/forms';
import { MobileTerminalTypes } from '@data/mobile-terminal';
import { map, take, skip, skipWhile } from 'rxjs/operators';
import CustomValidators from '@validators/.';
import { Observable } from 'rxjs';
// @ts-ignore
import moment from 'moment-timezone';

interface MobileTerminalFormValidator {
  essentailFields: UntypedFormGroup;
  mobileTerminalFields: UntypedFormGroup;
  channels: UntypedFormArray;
}

const alphanumericWithHyphenAndSpace = (c: UntypedFormControl) => {
  const REGEXP = /^[a-z0-9\- ]*$/i;
  return c.value === null || c.value.length === 0 || REGEXP.test(c.value) ? null : {
    validateAlphanumericHyphenAndSpace: true
  };
};

export const validateSerialNoExistsFactory = (serialNoObservable: Observable<boolean>) => {
  return (control: AbstractControl) => serialNoObservable.pipe(skipWhile((val => val === null)), take(1), map(res => {
    return res ? { serialNumberAlreadyExists: true } : null;
  }));
};

export const memberNumberAndDnidExistsFactory = (memberNumberAndDnidCombinationExistsObservable:
  Observable< Readonly<{readonly [channelId: string]: boolean}>>) =>
  (type: string) =>
    (control: AbstractControl) => memberNumberAndDnidCombinationExistsObservable.pipe(
      skipWhile(val => val === null || typeof control.parent === 'undefined' || val[control.parent.value.id] === null),
      take(1),
      map(res => {
        return res[control.parent.value.id] === true ? { memberNumberAndDnidCombinationExists: true } : null;
      })
    );

const createNewChannel = (
  channel: MobileTerminalTypes.Channel | null = null,
  memberNumberAndDnidCombinationExists: (type: string) =>
    (control: AbstractControl) => Observable<{ memberNumberAndDnidCombinationExists: boolean }|null>
): UntypedFormGroup  => {
  let formValues = {
    id: 'temp-' + Math.random().toString(36),
    name: '',
    pollChannel: false,
    configChannel: false,
    defaultChannel: false,
    dnid: null,
    memberNumber: null,
    lesDescription: '',
    startDate: null,
    endDate: null,
    expectedFrequency: 60,
    frequencyGracePeriod: 140,
    expectedFrequencyInPort: 140,
  };
  if(channel !== null) {
    formValues = {
      id: channel.id,
      name: channel.name,
      pollChannel: channel.pollChannel === null ? false : channel.pollChannel,
      configChannel: channel.configChannel === null ? false : channel.configChannel,
      defaultChannel: channel.defaultChannel === null ? false : channel.defaultChannel,
      dnid: channel.dnid,
      memberNumber: channel.memberNumber,
      lesDescription: channel.lesDescription,
      startDate: typeof channel.startDate === 'undefined' || channel.startDate === null ? null : moment(channel.startDate),
      endDate: typeof channel.endDate === 'undefined' || channel.endDate === null ? null : moment(channel.endDate),
      expectedFrequency: channel.expectedFrequency / (60 * 1000),
      frequencyGracePeriod: channel.frequencyGracePeriod / (60 * 1000),
      expectedFrequencyInPort: channel.expectedFrequencyInPort / (60 * 1000),
    };
  }

  return new UntypedFormGroup({
    id: new UntypedFormControl(formValues.id),
    name: new UntypedFormControl(formValues.name, [Validators.required]),
    pollChannel: new UntypedFormControl(formValues.pollChannel),
    configChannel: new UntypedFormControl(formValues.configChannel),
    defaultChannel: new UntypedFormControl(formValues.defaultChannel),
    dnid: new UntypedFormControl(
      formValues.dnid,
      [Validators.required, CustomValidators.minLengthOfNumber(5), CustomValidators.maxLengthOfNumber(5)],
      memberNumberAndDnidCombinationExists('dnid')
    ),
    memberNumber: new UntypedFormControl(
      formValues.memberNumber,
      [Validators.required, Validators.min(1), Validators.max(255)],
      memberNumberAndDnidCombinationExists('memberNumber')
    ),
    lesDescription: new UntypedFormControl(formValues.lesDescription, [Validators.required]),
    startDate: new UntypedFormControl(formValues.startDate, [CustomValidators.momentValid]),
    endDate: new UntypedFormControl(formValues.endDate, [CustomValidators.momentValid]),
    expectedFrequency: new UntypedFormControl(formValues.expectedFrequency, [Validators.required]),
    frequencyGracePeriod: new UntypedFormControl(formValues.frequencyGracePeriod, [Validators.required]),
    expectedFrequencyInPort: new UntypedFormControl(formValues.expectedFrequencyInPort, [Validators.required]),
  });
};

export const createMobileTerminalFormValidator = (
  mobileTerminal: MobileTerminalTypes.MobileTerminal,
  validateSerialNoExists: (control: AbstractControl) => Observable<{ serialNumberAlreadyExists: boolean }|null>,
  memberNumberAndDnidCombinationExists: (type: string) =>
    (control: AbstractControl) => Observable<{ memberNumberAndDnidCombinationExists: boolean }|null>
): UntypedFormGroup => {
  const selectedOceanRegions = [];
  if(mobileTerminal.eastAtlanticOceanRegion) { selectedOceanRegions.push('East Atlantic'); }
  if(mobileTerminal.indianOceanRegion) { selectedOceanRegions.push('Indian'); }
  if(mobileTerminal.pacificOceanRegion) { selectedOceanRegions.push('Pacific'); }
  if(mobileTerminal.westAtlanticOceanRegion) { selectedOceanRegions.push('West Atlantic'); }

  if(selectedOceanRegions.length === 0) {
    selectedOceanRegions.push('Indian');
  }

  let channels = [];
  if(mobileTerminal.channels !== undefined) {
    channels = mobileTerminal.channels.slice().sort((c1: MobileTerminalTypes.Channel, c2: MobileTerminalTypes.Channel) => {
      return c1.name.localeCompare(c2.name);
    }).map((channel) => createNewChannel(channel, memberNumberAndDnidCombinationExists));
  }
  if(channels.length === 0) {
    channels.push(createNewChannel(null, memberNumberAndDnidCombinationExists));
  }

  return new UntypedFormGroup({
    essentailFields: new UntypedFormGroup({
      mobileTerminalType: new UntypedFormControl(mobileTerminal.mobileTerminalType, Validators.required),
      serialNo: new UntypedFormControl(mobileTerminal.serialNo, [Validators.required, alphanumericWithHyphenAndSpace], validateSerialNoExists),
      selectedOceanRegions: new UntypedFormControl(selectedOceanRegions, [Validators.required]),
      transceiverType: new UntypedFormControl(mobileTerminal.transceiverType, [Validators.required]),
    }),
    mobileTerminalFields: new UntypedFormGroup({
      softwareVersion: new UntypedFormControl(mobileTerminal.softwareVersion),
      antenna: new UntypedFormControl(mobileTerminal.antenna),
      satelliteNumber: new UntypedFormControl(mobileTerminal.satelliteNumber),
      active: new UntypedFormControl(mobileTerminal.active),
      installDate: new UntypedFormControl(
        (typeof mobileTerminal.installDate === 'undefined' || mobileTerminal.installDate === null
          ? null
          : moment(mobileTerminal.installDate)
        ),
        [CustomValidators.momentValid]
      ),
      uninstallDate: new UntypedFormControl(
        (typeof mobileTerminal.uninstallDate === 'undefined' || mobileTerminal.uninstallDate === null
          ? null
          : moment(mobileTerminal.uninstallDate)
        ),
        [CustomValidators.momentValid]
      ),
      installedBy: new UntypedFormControl(mobileTerminal.installedBy),
    }),
    channels: new UntypedFormArray(channels),
  });
};

export const addChannelToFormValidator = (
  formValidator: UntypedFormGroup,
  memberNumberAndDnidCombinationExists: (type: string) =>
    (control: AbstractControl) => Observable<{ memberNumberAndDnidCombinationExists: boolean }|null>
): void => {
  const channels = formValidator.get('channels') as UntypedFormArray;
  channels.push(createNewChannel(null, memberNumberAndDnidCombinationExists));
};

export const removeChannelAtFromFromValidator = (formValidator: UntypedFormGroup, index: number): void => {
  const channels = formValidator.get('channels') as UntypedFormArray;
  return channels.removeAt(index);
};
