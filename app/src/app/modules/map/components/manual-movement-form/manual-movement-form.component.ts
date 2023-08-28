import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil, first } from 'rxjs/operators';


// @ts-ignore
import moment from 'moment-timezone';

import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature';
import { Circle as CircleStyle, Fill, Style, Icon } from 'ol/style';
import { fromLonLat, transform } from 'ol/proj';
import Event from 'ol/events';
import { Modify } from 'ol/interaction';

import { AssetTypes } from '@data/asset';
import { createManualMovementFormValidator } from './form-validator';
import { ManualMovementFormDialogComponent } from '@modules/map/components/manual-movement-form-dialog/manual-movement-form-dialog.component';

import { errorMessage } from '@app/helpers/validators/error-messages';
import { deg2rad } from '@app/helpers/helpers';
import { convertDDMToDD, convertDDToDDM } from '@app/helpers/wgs84-formatter';
import { formatUnixtime } from '@app/helpers/datetime-formatter';

@Component({
  selector: 'map-manual-movement-form',
  templateUrl: './manual-movement-form.component.html',
  styleUrls: ['./manual-movement-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManualMovementFormComponent implements OnInit, OnDestroy {
  @Input() createManualMovement: (manualMovement: AssetTypes.Movement) => void;
  @Input() map: Map;
  @Input() userTimezone: string;
  @Input() createNote: (note: string) => void;
  @Input() lastPosition: AssetTypes.Movement;

  private vectorSource: VectorSource;
  private vectorLayer: VectorLayer;
  private readonly layerTitle = 'Manual movement form preview';
  public formValidator: UntypedFormGroup;
  private readonly featureId = 'manual_movement_preview';
  public autoUpdateDatetime = false;

  private readonly unmount$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('latitudeElement') latitudeElement: ElementRef;
  @ViewChild('latitudeMinuteElement') latitudeMinuteElement: ElementRef;
  @ViewChild('latitudeDecimalsElement') latitudeDecimalsElement: ElementRef;
  @ViewChild('longitudeElement') longitudeElement: ElementRef;
  @ViewChild('longitudeMinuteElement') longitudeMinuteElement: ElementRef;
  @ViewChild('longitudeDecimalsElement') longitudeDecimalsElement: ElementRef;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.initializeFormValidator();

    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      title: this.layerTitle,
      source: this.vectorSource,
      zIndex: 20,
      renderBuffer: 200,
    });
    this.map.addLayer(this.vectorLayer);
  }

  ngOnDestroy() {
    this.unmount$.next(true);
    this.unmount$.unsubscribe();

    const cachedFeature = this.vectorSource.getFeatureById(this.featureId);
    if(cachedFeature) {
      this.vectorSource.removeFeature(cachedFeature);
    }
  }

  initializeFormValidator() {
    this.formValidator = createManualMovementFormValidator();

    this.formValidator.controls.latitude.valueChanges
      .pipe(takeUntil(this.unmount$), filter((value: string) => value !== null && value.toString().length >= 2))
      .subscribe((value) => {
        if(value.toString().length > 2) {
          const formControlLat = this.formValidator.get('latitude');
          formControlLat.setValue(value.toString().substring(0, 2));
        }
        this.latitudeMinuteElement.nativeElement.focus();
      });
    this.formValidator.controls.latitudeMinute.valueChanges
      .pipe(takeUntil(this.unmount$), filter((value: string) => value === null || value.toString().length >= 2))
      .subscribe((value) => {
        if(value === null) {
          this.latitudeElement.nativeElement.focus();
        } else {
          if(value.toString().length > 2) {
            const formControlLatMin = this.formValidator.get('latitudeMinute');
            formControlLatMin.setValue(value.toString().substring(0, 2));
          }
          this.latitudeDecimalsElement.nativeElement.focus();
        }
      });
    this.formValidator.controls.latitudeDecimals.valueChanges
      .pipe(takeUntil(this.unmount$), filter((value: string) => value === null || value.toString().length === 0))
      .subscribe(() => this.latitudeMinuteElement.nativeElement.focus());


    this.formValidator.controls.longitude.valueChanges
      .pipe(takeUntil(this.unmount$), filter((value: string) => value !== null && value.toString().length >= 3))
      .subscribe((value) => {
        if(value.toString().length > 3) {
          const formControlLong = this.formValidator.get('longitude');
          formControlLong.setValue(value.toString().substring(0, 3));
        }
        this.longitudeMinuteElement.nativeElement.focus();
      });
    this.formValidator.controls.longitudeMinute.valueChanges
      .pipe(takeUntil(this.unmount$), filter((value: string) => value === null || value.toString().length >= 2))
      .subscribe((value) => {
        if(value === null) {
          this.longitudeElement.nativeElement.focus();
        } else {
          if(value.toString().length > 2) {
            const formControlLongMin = this.formValidator.get('longitudeMinute');
            formControlLongMin.setValue(value.toString().substring(0, 2));
          }
          this.longitudeDecimalsElement.nativeElement.focus();
        }
      });
    this.formValidator.controls.longitudeDecimals.valueChanges
      .pipe(takeUntil(this.unmount$), filter((value: string) => value === null || value.toString().length === 0))
      .subscribe(() => this.longitudeMinuteElement.nativeElement.focus());
  }

  extractLocationFromForm() {
    return {
      latitude: this.formValidator.value.latitudeDirection + ' ' +
      this.formValidator.value.latitude + '° ' +
      this.formValidator.value.latitudeMinute + '.' +
      this.formValidator.value.latitudeDecimals + '\'',

      longitude: this.formValidator.value.longitudeDirection + ' ' +
      this.formValidator.value.longitude + '° ' +
      this.formValidator.value.longitudeMinute + '.' +
      this.formValidator.value.longitudeDecimals + '\''
    };
  }

  save() {
    const locationDDM = this.extractLocationFromForm();
    const location = convertDDMToDD(locationDDM.latitude, locationDDM.longitude);

    this.createManualMovement({
      location: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
      heading: this.formValidator.value.heading !== null ? parseFloat(this.formValidator.value.heading) : 0,
      timestamp: Math.floor(this.formValidator.value.timestamp.format('x')),
      speed: this.formValidator.value.speed !== null ? parseFloat(this.formValidator.value.speed) : 0,
    } as AssetTypes.Movement);
    const cachedFeature = this.vectorSource.getFeatureById(this.featureId);
    this.vectorSource.removeFeature(cachedFeature);

    this.createNote(this.generateNote(this.formValidator.value.note, locationDDM, this.formValidator.value.timestamp));

    this.autoUpdateDatetime = true;
    // Remove subscriptions for previous form.
    this.unmount$.next(true);
    this.formValidator.controls.latitude.setValue('');
    this.formValidator.controls.latitudeMinute.setValue('');
    this.formValidator.controls.latitudeDecimals.setValue('');
    this.formValidator.controls.longitude.setValue('');
    this.formValidator.controls.longitudeMinute.setValue('');
    this.formValidator.controls.longitudeDecimals.setValue('');
    this.formValidator.controls.timestamp.setValue(null);
    this.formValidator.controls.note.setValue('');
    this.unmount$.next(false);
    this.initializeFormValidator();
    setTimeout(() => {
      this.autoUpdateDatetime = false;
    }, 100);
  }

  generateNote(note: string, locationDDM, timestamp) {
    return '<i>Manual Position: ' + locationDDM.latitude + ' ' + locationDDM.longitude + ', ' +
           formatUnixtime(Math.floor(timestamp.format('x'))) + ' (' + this.userTimezone + ')</i></br></br>' + note;
  }

  renderPreview() {
    const cachedFeature = this.vectorSource.getFeatureById(this.featureId);
    if(this.formValidator.value.latitude > '' && this.formValidator.value.longitude > '' &&
        this.formValidator.value.latitudeMinute > '' && this.formValidator.value.longitudeMinute > '') {
      const locationDDM = this.extractLocationFromForm();
      const location = convertDDMToDD(locationDDM.latitude, locationDDM.longitude);
      const position = new Point(fromLonLat([location.longitude, location.latitude]));
      const heading = this.formValidator.value.heading > '' ? deg2rad(parseInt(this.formValidator.value.heading, 10)) : 0;
      if (cachedFeature === null) {
        const previewFeature = new Feature(position);
        const fill = new Fill({
          color: 'rgba(232,78,15,0.65)'
        });

        const styles = [
          new Style({
            image: new Icon({
              src: '/assets/Vessel.png',
              rotation: heading,
              color: '#FFFFFF'
            }),
            zIndex: 1
          }),
          new Style({
            image: new CircleStyle({
              fill,
              radius: 10
            }),
            zIndex: 0
          })
        ];

        previewFeature.setStyle(styles);

        previewFeature.setId(this.featureId);
        this.vectorSource.addFeature(previewFeature);

        const modify = new Modify({source: this.vectorSource});

        modify.on('modifyend', (evt: Event) => {
          const newCoords = transform(evt.mapBrowserEvent.coordinate, 'EPSG:3857', 'EPSG:4326');
          this.setFormLocation(newCoords[1], newCoords[0]);
        });
        this.map.addInteraction(modify);
      } else {
        cachedFeature.setGeometry(position);
        cachedFeature.getStyle()[0].getImage().setRotation(heading);
      }
      const coordinates = [fromLonLat([location.longitude, location.latitude])];
      if (this.lastPosition) {
        coordinates.push(fromLonLat([this.lastPosition.location.longitude, this.lastPosition.location.latitude]));
      }
      this.map.getView().fit(new LineString(coordinates), { minResolution: 15, padding: [50, 400, 50, 400], duration: 1000 });
    } else if(cachedFeature !== null) {
      this.vectorSource.removeFeature(cachedFeature);
    }
  }

  validateNumber(event: KeyboardEvent) {
    const allowedKeys = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Tab', 'Shift', 'Backspace', 'Delete', 'ArrowRight', 'ArrowLeft'
    ];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  setFormLocation(latitude: number, longitude: number) {
    const newLocation = convertDDToDDM(latitude, longitude);
    const [latDir, lat, latMin, latDec] = newLocation.latitude.replace('°','').replace('.',' ').replace("'",' ').split(' ');
    this.formValidator.controls.latitudeDirection.setValue(latDir, { emitEvent: false });
    this.formValidator.controls.latitude.setValue(lat, { emitEvent: false });
    this.formValidator.controls.latitudeMinute.setValue(latMin, { emitEvent: false });
    this.formValidator.controls.latitudeDecimals.setValue(latDec, { emitEvent: false });
    const [lonDir, lon, lonMin, lonDec] = newLocation.longitude.replace('°','').replace('.',' ').replace("'",' ').split(' ');
    this.formValidator.controls.longitudeDirection.setValue(lonDir, { emitEvent: false });
    this.formValidator.controls.longitude.setValue(lon, { emitEvent: false });
    this.formValidator.controls.longitudeMinute.setValue(lonMin, { emitEvent: false });
    this.formValidator.controls.longitudeDecimals.setValue(lonDec, { emitEvent: false });
    this.renderPreview();
  }

  // pasteLatitude(event: ClipboardEvent) {
  //   // @ts-ignore
  //   const clipboardData = event.clipboardData || window.clipboardData;
  //   const pastedText = clipboardData.getData('text');
  //   const index = 3;
  //
  //   const formControlLat = this.formValidator.get('latitude');
  //   formControlLat.setValue(pastedText.substring(0, index));
  //
  //   const formControlLatDec = this.formValidator.get('latitudeDecimals');
  //   formControlLatDec.setValue(pastedText.substring(index));
  //
  //   return false;
  // }
  //
  // pasteLongitude(event: ClipboardEvent) {
  //   // @ts-ignore
  //   const clipboardData = event.clipboardData || window.clipboardData;
  //   const pastedText = clipboardData.getData('text');
  //   const index = 3;
  //
  //   const formControlLong = this.formValidator.get('longitude');
  //   formControlLong.setValue(pastedText.substring(0, index));
  //
  //   const formControlLongDec = this.formValidator.get('longitudeDecimals');
  //   formControlLongDec.setValue(pastedText.substring(index));
  //
  //   return false;
  // }

  getErrors(path: string[]) {
    const field = this.formValidator.get(path);
    if(!field.untouched) {
      const errors = this.formValidator.get(path).errors;
      return errors === null ? [] : Object.entries(errors).map(error => ({ errorType: error[0], errorObject: error[1] }));
    }
    return [];
  }

  errorMessage(error: Readonly<{errorType: string, errorObject: any}>) {
    return errorMessage(error.errorType, error.errorObject);
  }

  getErrorMessages(path: string[]): string[] {
    return this.getErrors(path).map(error => this.errorMessage(error));
  }

  updateTimestamp(dateTime: moment.Moment) {
    const formControl = this.formValidator.get('timestamp');
    formControl.setValue(dateTime);
  }

  openSaveDialog(): void {
    const locationDDM = this.extractLocationFromForm();
    const location = locationDDM.latitude + ', ' + locationDDM.longitude;

    const dialogRef = this.dialog.open(ManualMovementFormDialogComponent, {
      data: {
        location,
        timestamp: formatUnixtime(Math.floor(this.formValidator.value.timestamp.format('x'))),
        userTimezone: this.userTimezone,
      }
    });

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if(result === true) {
        this.save();
      }
    });
  }
}
