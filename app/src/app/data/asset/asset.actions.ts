import { Action } from '@ngrx/store';
import { Asset } from './asset.interfaces';


export enum ActionTypes {
  AddForecast = '[Asset] Add forecast',
  AddPositionForInspection = '[Asset] Add position for inspection',
  AssetMoved = '[Asset] Moved',
  AssetsMoved = '[Asset] Multiple moves',
  ClearForecasts = '[Asset] Clear forecasts',
  ClearTracks = '[Asset] Clear tracks',
  FailedToSubscribeToMovements = '[Asset] Failed to subscribe to movements',
  GetAssetTrack = '[Asset] Get asset track',
  GetAssetTrackFromTime = '[Asset] Get asset track from time',
  RemoveForecast = '[Asset] Remove forecast',
  RemovePositionForInspection = '[Asset] Remove position for inspection',
  SubscribeToMovements = '[Asset] Subscribe to movements',
  SelectAsset = '[Asset] Select asset',
  SetFullAsset = '[Asset] Set full asset',
  SetAssetTrack = '[Asset] Set asset track',
  UnsubscribeToMovements = '[Asset] Unsubscribe to movements',
  UntrackAsset = '[Asset] Untrack asset.',
  TrimTracksThatPassedTimeCap = '[Asset] Trim tracks that passed time cap',
  SetAutocompleteQuery = '[Asset] Set autocomplete query',
  SetFilterQuery = '[Asset] Set Filter Query',


  GetAssetList = '[Asset] Get list'
}

export class SetAutocompleteQuery implements Action {
  readonly type = ActionTypes.SetAutocompleteQuery;
  constructor(public payload: any) {}
}

export class SetFilterQuery implements Action {
  readonly type = ActionTypes.SetFilterQuery;
  constructor(public payload: any) {}
}

export class GetAssetList implements Action {
  readonly type = ActionTypes.GetAssetList;
}

export class SubscribeToMovements implements Action {
  readonly type = ActionTypes.SubscribeToMovements;
}

export class UnsubscribeToMovements implements Action {
  readonly type = ActionTypes.UnsubscribeToMovements;
}

export class AssetMoved implements Action {
  readonly type = ActionTypes.AssetMoved;

  constructor(public payload: Asset) {}
}

export class AssetsMoved implements Action {
  readonly type = ActionTypes.AssetsMoved;

  constructor(public payload: Array<Asset>) {}
}

export class FailedToSubscribeToMovements implements Action {
  readonly type = ActionTypes.SubscribeToMovements;
}

export class SelectAsset implements Action {
  readonly type = ActionTypes.SelectAsset;
  constructor(public payload: string) {}
}

export class SetFullAsset implements Action {
  readonly type = ActionTypes.SetFullAsset;
  constructor(public payload: any) {}
}

export class GetAssetTrack implements Action {
  readonly type = ActionTypes.GetAssetTrack;
  constructor(public payload: any) {}
}

export class GetAssetTrackFromTime implements Action {
  readonly type = ActionTypes.GetAssetTrackFromTime;
  constructor(public payload: any) {}
}

export class SetAssetTrack implements Action {
  readonly type = ActionTypes.SetAssetTrack;
  constructor(public payload: any) {}
}

export class UntrackAsset implements Action {
  readonly type = ActionTypes.UntrackAsset;
  constructor(public payload: any) {}
}

export class AddPositionForInspection implements Action {
  readonly type = ActionTypes.AddPositionForInspection;
  constructor(public payload: any) {}
}

export class RemovePositionForInspection implements Action {
  readonly type = ActionTypes.RemovePositionForInspection;
  constructor(public payload: any) {}
}

export class AddForecast implements Action {
  readonly type = ActionTypes.AddForecast;
  constructor(public payload: any) {}
}

export class RemoveForecast implements Action {
  readonly type = ActionTypes.RemoveForecast;
  constructor(public payload: any) {}
}

export class ClearForecasts implements Action {
  readonly type = ActionTypes.ClearForecasts;
}

export class ClearTracks implements Action {
  readonly type = ActionTypes.ClearTracks;
}

interface TrimTracksThatPassedTimeCapPayload {
  unixtime: number;
}
export class TrimTracksThatPassedTimeCap implements Action {
  readonly type = ActionTypes.TrimTracksThatPassedTimeCap;
  constructor(public payload: TrimTracksThatPassedTimeCapPayload) {}
}
