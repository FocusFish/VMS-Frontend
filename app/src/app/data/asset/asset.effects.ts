import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, EMPTY, merge, Observable } from 'rxjs';
import { map, mergeMap, mergeAll, flatMap, catchError, withLatestFrom, bufferTime, filter } from 'rxjs/operators';

import { AuthReducer, AuthSelectors } from '../auth';
import { MapSettingsSelectors } from '../map-settings';

import {
  ActionTypes, SetFullAsset, AssetsMoved, SetAssetTrack, TrimTracksThatPassedTimeCap, SetAssetList,
  SetEssentialProperties, CheckForAssetEssentials
} from './asset.actions';
import { AssetService } from './asset.service';
import { AssetSelectors, AssetInterfaces } from './';

@Injectable()
export class AssetEffects {
  constructor(
    private actions$: Actions,
    private assetService: AssetService,
    private store$: Store<AuthReducer.State>
  ) {}

  @Effect()
  assetSearchObserver$ = this.actions$.pipe(
    ofType(ActionTypes.SearchAssets),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return this.assetService.listAssets(authToken, action.payload).pipe(
        map((response: any) => {
          return new SetAssetList({
            searchParams: action.payload,
            totalNumberOfPages: response.totalNumberOfPages,
            currentPage: response.currentPage,
            assets: response.assetList.reduce((acc, asset) => {
              acc[asset.historyId] = asset;
              return acc;
            }, {})
          });
        })
      );
    })
  );

  @Effect()
  assetGetListObserver$ = this.actions$.pipe(
    ofType(ActionTypes.GetAssetList),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return this.assetService.listAssets(authToken, action.payload).pipe(
        map((response: any) => {
          return new SetAssetList({
            searchParams: action.payload,
            totalNumberOfPages: response.totalNumberOfPages,
            currentPage: response.currentPage,
            assets: response.assetList.reduce((acc, asset) => {
              acc[asset.historyId] = asset;
              return acc;
            }, {})
          });
        })
      );
    })
  );

  @Effect()
  assetMovementUnsubscribeObserver$ = this.actions$.pipe(
    ofType(ActionTypes.UnsubscribeToMovements),
    mergeMap((action) => {
      this.assetService.unsubscribeToMovements();
      return EMPTY;
    })
  );

  @Effect()
  assetMovementSubscribeObserver$ = this.actions$.pipe(
    ofType(ActionTypes.SubscribeToMovements),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return merge(
        this.assetService.getInitalAssetMovements(authToken).pipe(map((assetMovements: any) => {
          return Observable.create((observer) => {
            observer.next(
              new AssetsMoved(assetMovements.microMovements.reduce((acc, assetMovement) => {
                acc[assetMovement.asset] = assetMovement;
                return acc;
              }, {}))
            );
            observer.next(
              new SetEssentialProperties(assetMovements.assetList.reduce((acc, assetEssentials) => {
                acc[assetEssentials.assetId] = assetEssentials;
                return acc;
              }, {}))
            );
            observer.complete();
          });
        }), mergeAll()),
        this.assetService.subscribeToMovements(authToken).pipe(
          bufferTime(1000),
          map((assetMovements: Array<any>) => {
            if (assetMovements.length !== 0) {
              return [
                new AssetsMoved(assetMovements.reduce((acc, assetMovement) => {
                  acc[assetMovement.asset] = assetMovement;
                  return acc;
                }, {})),
                new CheckForAssetEssentials(assetMovements)
              ];
            } else {
              return null;
            }
          }),
          filter(val => val !== null),
          withLatestFrom(this.store$.select(MapSettingsSelectors.getTracksMinuteCap)),
          map(([listOfActions, tracksMinuteCap]: Array<any>) => {
            if(tracksMinuteCap !== null) {
              listOfActions.push(new TrimTracksThatPassedTimeCap({ unixtime: (Date.now() - (tracksMinuteCap * 60 * 1000))}));
            }
            return listOfActions;
          }),
          // tslint:disable-next-line:comment-format
          //@ts-ignore
          // tslint:disable-next-line:no-shadowed-variable
          flatMap( (action, index): object => action ),
          catchError((err) => of({ type: ActionTypes.FailedToSubscribeToMovements, payload: err }))
        ),
        this.assetService.subscribeToAssetUpdates(authToken).pipe(
          bufferTime(500),
          map((assetsEssentials: Array<any>) => {
            if (assetsEssentials.length !== 0) {
              return new SetEssentialProperties(assetsEssentials.reduce((acc, assetEssentials) => {
                acc[assetEssentials.assetId] = assetEssentials;
                return acc;
              }, {}));
            } else {
              return null;
            }
          }),
          filter(val => val !== null)
        )
      );
    })
  );

  @Effect()
  assetEssentialsObserver$ = this.actions$.pipe(
    ofType(ActionTypes.CheckForAssetEssentials),
    withLatestFrom(
      this.store$.select(AuthSelectors.getAuthToken),
      // tslint:disable-next-line:comment-format
      //@ts-ignore
      this.store$.select(AssetSelectors.getAssetsEssentials)
    ),
    mergeMap(([action, authToken, currentAssetsEssentials]: Array<any>) => {
      const assetIdsWithoutEssentials = action.payload.reduce((acc, assetMovement) => {
        if(currentAssetsEssentials[assetMovement.asset] === undefined) {
          acc.push(assetMovement.asset);
        }
        return acc;
      }, []);
      if(assetIdsWithoutEssentials.length > 0) {
        return this.assetService.getAssetEssentialProperties(
          authToken, assetIdsWithoutEssentials
        ).pipe(map((assetsEssentials: Array<AssetInterfaces.AssetEssentialProperties>) => {
          return new SetEssentialProperties(assetsEssentials.reduce((acc, assetEssentials) => {
            acc[assetEssentials.assetId] = assetEssentials;
            return acc;
          }, {}));
        }));
      } else {
        return EMPTY;
      }
    })
  );

  @Effect()
  selectAssetObserver$ = this.actions$.pipe(
    ofType(ActionTypes.SelectAsset),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return this.assetService.getAsset(authToken, action.payload).pipe(
        map((asset: any) => {
          return new SetFullAsset(asset);
        })
      );
    })
  );

  @Effect()
  selectAssetTrackObserver$ = this.actions$.pipe(
    ofType(ActionTypes.GetAssetTrack),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return this.assetService.getAssetTrack(authToken, action.payload.movementGuid).pipe(
        map((assetTrack: any) => {
          return new SetAssetTrack({ tracks: assetTrack, assetId: action.payload.assetId, visible: true });
        })
      );
    })
  );

  @Effect()
  selectAssetTrackFromTimeObserver$ = this.actions$.pipe(
    ofType(ActionTypes.GetAssetTrackFromTime),
    withLatestFrom(this.store$.select(AuthSelectors.getAuthToken)),
    mergeMap(([action, authToken]: Array<any>) => {
      return this.assetService.getAssetTrackFromTime(authToken, action.payload.assetId, action.payload.datetime).pipe(
        map((assetTrack: any) => {
          return new SetAssetTrack({ tracks: assetTrack.reverse(), assetId: action.payload.assetId, visible: true });
        })
      );
    })
  );

}
