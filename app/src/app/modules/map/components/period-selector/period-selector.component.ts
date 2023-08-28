import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { formatDate } from '@app/helpers/helpers';
// @ts-ignore
import moment from 'moment-timezone';
import { errorMessage } from '@app/helpers/validators/error-messages';

import { createPeriodSelectorFormValidator } from './form-validator';

@Component({
  selector: 'map-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss']
})
export class PeriodSelectorComponent implements OnInit {

  @Input() setPeriod: (from: number, to: number) => void;
  public formValidator: UntypedFormGroup;

  public periods = [
    { value: 86400000, label: '24 hours' },  // 24 * 60 * 60 * 1000
    { value: 172800000, label: '48 hours' }, // 48 * 60 * 60 * 1000
    { value: 259200000, label: '72 hours' }, // 72 * 60 * 60 * 1000
    { value: 345600000, label: '96 hours' }, // 96 * 60 * 60 * 1000
  ];

  ngOnInit() {
    this.formValidator = createPeriodSelectorFormValidator();
  }

  public getReport = () => {
    const startDateTimestamp = this.formValidator.value.to.format('x') - this.formValidator.value.periodLength;
    this.setPeriod(startDateTimestamp, this.formValidator.value.to.format('x'));
  }


  public getErrors(path: string[]): Array<{errorType: string, error: string }> {
    const errors = this.formValidator.get(path).errors;
    return errors === null ? [] : Object.keys(errors).map(errorType => ({ errorType, error: errors[errorType] }));
  }

  public getErrorMessages(path: string[]): string[] {
    return this.getErrors(path).map(error => errorMessage(error.errorType, error.error));
  }

  public updateTo(datetime: moment.Moment) {
    const formControl = this.formValidator.get('to');
    formControl.setValue(datetime);
  }
}
