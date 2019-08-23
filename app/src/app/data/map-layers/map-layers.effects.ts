import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, EMPTY, merge, Observable } from 'rxjs';
import { map, mergeMap, mergeAll, flatMap, catchError, withLatestFrom, bufferTime, filter } from 'rxjs/operators';

import { AuthReducer, AuthSelectors } from '../auth';

import { MapLayersService } from './map-layers.service';
import { MapLayersActions } from './';

@Injectable()
export class MapLayersEffects {
  constructor(
    private actions$: Actions,
    private mapLayersService: MapLayersService,
    private store$: Store<AuthReducer.State>
  ) {}

  @Effect()
  getAreas$ = this.actions$.pipe(
    ofType(MapLayersActions.ActionTypes.GetAreas),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return this.mapLayersService.getAreas(authToken).pipe(
        map((response: any) => {
          console.warn(response);
          // return new SetAssetList({
          //   searchParams: action.payload,
          //   totalNumberOfPages: response.totalNumberOfPages,
          //   currentPage: response.currentPage,
          //   assets: response.assetList.reduce((acc, asset) => {
          //     acc[asset.historyId] = asset;
          //     return acc;
          //   }, {})
          // });

        })
      );
    })
  );
}
