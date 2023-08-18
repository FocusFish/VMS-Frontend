import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { getAlpha3Codes, langs, getNames, alpha2ToAlpha3, getName } from 'i18n-iso-countries';
import { errorMessage } from '@app/helpers/validators/error-messages';
// import enLang from 'i18n-iso-countries/langs/en.json';
// countries.registerLocale(enLang);

import { createAssetFormValidator } from './form-validator';

import { State } from '@app/app-reducer';
import { AssetTypes, AssetActions, AssetSelectors } from '@data/asset';
import { RouterTypes, RouterSelectors } from '@data/router';

@Component({
  selector: 'asset-edit-page',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {
    
  public allFlagstates = Object.keys(getAlpha3Codes());
  public asset = {} as AssetTypes.Asset;
  public assetSubscription: Subscription;
  public unitTonnagesSubscription: Subscription;
  public unitTonnages: ReadonlyArray<AssetTypes.UnitTonnage>;
  
  public assetObject = {} as AssetTypes.Asset;
  public formValidator: FormGroup;
  public save: () => void;
  public mergedRoute: RouterTypes.MergedRoute;

  public allCountries = getNames('en');
  public flagStatesAndNames =  Object.values(Object.entries(this.allCountries).reduce((obj, [key, value]) => 
  ({ ...obj, [value]: alpha2ToAlpha3(key) + " " + getName(key, 'en') }), { })).sort();

  constructor(private readonly store: Store<State>) {}

  mapStateToProps() {
    
    this.unitTonnagesSubscription = this.store.select(AssetSelectors.getUnitTonnages).subscribe((unitTonnages) => {
      this.unitTonnages = unitTonnages;
      if(
        unitTonnages.length > 0 && (
          typeof this.assetObject.grossTonnageUnit === 'undefined' ||
          this.assetObject.grossTonnageUnit === null
        )
      ) {
        this.assetObject = {
          ...this.assetObject,
          grossTonnageUnit: unitTonnages[0].code
        };
      }
    });
    this.assetSubscription = this.store.select(AssetSelectors.getAssetByUrl).subscribe((asset: AssetTypes.Asset) => {
      if(typeof asset !== 'undefined') {
        this.asset = asset;
      }
      this.formValidator = createAssetFormValidator(this.asset);
    });
    this.store.select(RouterSelectors.getMergedRoute).pipe(take(1)).subscribe(mergedRoute => {
      this.mergedRoute = mergedRoute;
      if(typeof this.mergedRoute.params.assetId !== 'undefined') {
        this.store.dispatch(AssetActions.getSelectedAsset());
      }
    });
  }

  mapDispatchToProps() {
    this.save = () => {
      this.store.dispatch(AssetActions.saveAsset({ asset: {
        ...this.asset,
        flagStateCode: (this.formValidator.value.essentailFields.flagState).substring(0,3),
        externalMarking: this.formValidator.value.essentailFields.externalMarking,
        name: this.formValidator.value.essentailFields.name,
        cfr: this.formValidator.value.identificationFields.cfr,
        ircs: this.formValidator.value.identificationFields.ircs,
        imo: this.formValidator.value.identificationFields.imo,
        portOfRegistration: this.formValidator.value.identificationFields.portOfRegistration,
        mmsi: this.formValidator.value.identificationFields.mmsi,
        vesselType: this.formValidator.value.identificationFields.vesselType,
        lengthOverAll: this.formValidator.value.metrics.lengthOverAll,
        lengthBetweenPerpendiculars: this.formValidator.value.metrics.lengthBetweenPerpendiculars,
        grossTonnage: this.formValidator.value.metrics.grossTonnage,
        grossTonnageUnit: this.formValidator.value.metrics.grossTonnageUnit,
        powerOfMainEngine: this.formValidator.value.metrics.powerOfMainEngine,
        prodOrgName: this.formValidator.value.companyInformation.prodOrgName,
        prodOrgCode: this.formValidator.value.companyInformation.prodOrgCode,
      }}));
    };
  }

  ngOnInit() {
    this.mapStateToProps();
    this.mapDispatchToProps();
    this.store.dispatch(AssetActions.getUnitTonnage());
    this.store.dispatch(AssetActions.getSelectedAsset());
    
  }

  ngOnDestroy() {
    if(this.unitTonnagesSubscription !== undefined) {
      this.unitTonnagesSubscription.unsubscribe();
    }
    if(this.assetSubscription !== undefined) {
      this.assetSubscription.unsubscribe();
    }
  }

  isCreate() {
    return typeof this.mergedRoute.params.assetId === 'undefined';
  }

  isFormReady() {
    return this.isCreate() || Object.entries(this.asset).length !== 0;
  }

  getErrors(path: string[]) {
    const errors = this.formValidator.get(path).errors;
    return errors === null ? [] : Object.keys(errors);
  }

  errorMessage(error: string) {
    return errorMessage(error);
  }

  public vesselTypes = [
        "Not available (default)",
        "Wing in ground (WIG), all ships of this type",
        "Wing in ground (WIG), Hazardous category A",
        "Wing in ground (WIG), Hazardous category B",
        "Wing in ground (WIG), Hazardous category C",
        "Wing in ground (WIG), Hazardous category D",
        "Fishing",
        "Towing",
        "Towing: length exceeds 200m or breadth exceeds 25m",
        "Dredging or underwater ops",
        "Diving ops",
        "Military ops",
        "Sailing",
        "Pleasure Craft",
        "High speed craft (HSC), all ships of this type",
        "High speed craft (HSC), Hazardous category A",
        "High speed craft (HSC), Hazardous category B",
        "High speed craft (HSC), Hazardous category C",
        "High speed craft (HSC), Hazardous category D",
        "High speed craft (HSC), No additional information",
        "Pilot Vessel",
        "Search and Rescue vessel",
        "Tug",
        "Port Tender",
        "Anti-pollution equipment",
        "Law Enforcement",
        "Spare - Local Vessel",
        "Medical Transport",
        "Noncombatant ship according to RR Resolution No. 18",
        "Passenger, all ships of this type",
        "Passenger, Hazardous category A",
        "Passenger, Hazardous category B",
        "Passenger, Hazardous category C",
        "Passenger, Hazardous category D",
        "Passenger, No additional information",
        "Cargo, all ships of this type",
        "Cargo, Hazardous category A",
        "Cargo, Hazardous category B",
        "Cargo, Hazardous category C",
        "Cargo, Hazardous category D",
        "Cargo, No additional information",
        "Tanker, all ships of this type",
        "Tanker, Hazardous category A",
        "Tanker, Hazardous category B",
        "Tanker, Hazardous category C",
        "Tanker, Hazardous category D",
        "Tanker, No additional information",
        "Other Type, all ships of this type",
        "Other Type, Hazardous category A",
        "Other Type, Hazardous category B",
        "Other Type, Hazardous category C",
        "Other Type, Hazardous category D",
        "Other Type, no additional information"
  ];
}
