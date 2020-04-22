import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_NAVIGATED, RouterNavigationAction } from '@ngrx/router-store';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of, EMPTY, merge, Observable, interval, Subject } from 'rxjs';
import { map, mergeMap, mergeAll, flatMap, catchError, withLatestFrom, bufferTime, filter, takeUntil } from 'rxjs/operators';

import { State } from '@app/app-reducer.ts';
import { AuthTypes, AuthSelectors } from '../auth';
import { MapSettingsSelectors } from '../map-settings';

import { IncidentService } from './incident.service';
import { IncidentActions, IncidentTypes } from './';
import { AssetTypes, AssetActions } from '@data/asset';
import * as RouterSelectors from '@data/router/router.selectors';
import * as NotificationsActions from '@data/notifications/notifications.actions';
import { MobileTerminalTypes, MobileTerminalActions } from '@data/mobile-terminal';

@Injectable()
export class IncidentEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly assetService: IncidentService,
    private readonly store$: Store<State>,
    private readonly router: Router
  ) {}

  @Effect()
  getAssetNotSendingIncidents$ = this.actions$.pipe(
    ofType(IncidentActions.getAssetNotSendingIncidents),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return this.assetService.getAssetNotSendingEvents(authToken).pipe(
        map((assetNotSendingIncidents: ReadonlyArray<IncidentTypes.assetNotSendingIncident>) => {
          return [
            IncidentActions.setAssetNotSendingIncidents({
              assetNotSendingIncidents: assetNotSendingIncidents.reduce((acc, assetNotSendingIncident) => {
                acc[assetNotSendingIncident.assetId] = assetNotSendingIncident;
                return acc;
              }, {})
            }),
            AssetActions.checkForAssetEssentials({
              assetIds: assetNotSendingIncidents.map((incident) => incident.assetId)
            })
          ];
        }),
        flatMap(a => a),
      );
    })
  );

  @Effect()
  saveNewIncidentStatus$ = this.actions$.pipe(
    ofType(IncidentActions.saveNewIncidentStatus),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      console.warn(action);
      return this.assetService.saveNewIncidentStatus(authToken, action.incidentId, action.status).pipe(
        map((asset: AssetTypes.Asset) => {
          return [NotificationsActions.addSuccess(
            $localize`:@@ts-incident-changed:Incident status successfully changed!`
          )];
        })
      );
    }),
    flatMap(a => a)
  );
}
