import { Component, Input, OnChanges } from '@angular/core';
import getContryISO2 from 'country-iso-3-to-2';

import { formatUnixdate } from '@app/helpers/datetime-formatter';

import { AssetTypes } from '@data/asset';

@Component({
  selector: 'asset-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnChanges {
  @Input() asset: AssetTypes.Asset;
  @Input() licence: AssetTypes.AssetLicence;

  public formattedLicence: AssetTypes.AssetLicence & {
    formattedToDate: string;
    formattedDecisionDate: string,
    formattedFromDate: string,
  };

  ngOnChanges() {
    if(typeof this.licence !== 'undefined' && this.licence !== null) {
      this.formattedLicence = {
        ...this.licence,
        formattedToDate: formatUnixdate(this.licence.toDate),
        formattedDecisionDate: formatUnixdate(this.licence.decisionDate),
        formattedFromDate: formatUnixdate(this.licence.fromDate),
      };
    }
  }

  public getCountryCode() {
    const countryCode = getContryISO2(this.asset.flagStateCode);
    if(typeof countryCode === 'undefined') {
      return '???';
    }
    return countryCode.toLowerCase();
  }
}
