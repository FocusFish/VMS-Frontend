import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { TestingModule } from '@testing/Utils';

/* Modules */
import { UIModule } from '../../../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';

import { RealtimeComponent } from './realtime.component';

/* Components */
import { AssetsComponent } from '../../components/assets/assets.component';
import { AssetForecastComponent } from '../../components/asset-forecast/asset-forecast.component';
import { AssetPanelComponent } from '../../components/asset-panel/asset-panel.component';
import { AssetSearchComponent } from '../../components/asset-search/asset-search.component';
import { FlagstatesComponent } from '../../components/flagstates/flagstates.component';
import { InformationPanelComponent } from '../../components/information-panel/information-panel.component';
import { MapSettingsComponent } from '../../components/map-settings/map-settings.component';
import { MapViewportsComponent } from '../../components/map-viewports/map-viewports.component';
import { TracksComponent } from '../../components/tracks/tracks.component';
import { TrackPanelComponent } from '../../components/track-panel/track-panel.component';

import { AssetReducer, AssetActions } from '@data/asset';
import AssetMovementStub from '@data/asset/stubs/assetMovement.stub';
import AssetTrackStub from '@data/asset/stubs/assetTracks.stub';
import { MapSettingsReducer, MapSettingsActions } from '@data/map-settings';

/* tslint:disable:no-string-literal */
describe('RealtimeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
        UIModule,
        FormsModule,
        MatAutocompleteModule,
      ],
      declarations: [
        RealtimeComponent,
        AssetsComponent,
        AssetForecastComponent,
        AssetPanelComponent,
        AssetSearchComponent,
        FlagstatesComponent,
        InformationPanelComponent,
        MapSettingsComponent,
        MapViewportsComponent,
        TracksComponent,
        TrackPanelComponent
      ],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    })
    .compileComponents();
  }));


  function setup() {
    const fixture = TestBed.createComponent(RealtimeComponent);
    const component = fixture.componentInstance;
    return { fixture, component };
  }

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  describe('mapStateToProps', () => {

    it('should update assets when state is updated.', () => {
      const { component } = setup();
      const store = TestBed.get(Store);
      const currentState = { asset: AssetReducer.initialState };

      store.setState(currentState);
      component.mapStateToProps();

      expect(component['assets']).not.toEqual([AssetMovementStub]);
      store.setState({
        ...currentState,
        asset: {
          ...currentState.asset,
          assetMovements: {
            [AssetMovementStub.asset]: AssetMovementStub
          }
        }
      });
      expect(component['assets']).toEqual([AssetMovementStub]);
    });

    it('should update mapSettings when state is updated.', () => {
      const { component } = setup();
      const store = TestBed.get(Store);
      const currentState = { asset: { assetMovements: {}, filterQuery: [] }, mapSettings: MapSettingsReducer.initialState };

      store.setState(currentState);
      component.mapStateToProps();

      expect(component.mapSettings).toEqual(MapSettingsReducer.initialState);
      expect(component.mapSettings.flagsVisible).toBeFalsy();
      store.setState({
        ...currentState,
        mapSettings: {
          ...currentState.mapSettings,
          flagsVisible: true
        }
      });
      // mapSettingsSubscription.unsubscribe();
      expect(component.mapSettings.flagsVisible).toBeTruthy();
    });

    it('should update selectedAsset when state is updated.', () => {
      const { component } = setup();
      const store = TestBed.get(Store);
      let currentState = { asset: AssetReducer.initialState };

      store.setState(currentState);
      component.mapStateToProps();

      let selectedAsset;
      const selectedAssetSubscription =
        component.selectedAsset$.subscribe(newSelectedAsset => selectedAsset = newSelectedAsset);
      expect(selectedAsset).toEqual({ asset: undefined, assetTracks: undefined, currentPosition: undefined });
      currentState = { ...currentState, asset: {
        ...currentState.asset, selectedAsset: AssetMovementStub.asset, assetMovements: { [AssetMovementStub.asset]: AssetMovementStub}
      } };
      store.setState(currentState);
      expect(selectedAsset).toEqual({ asset: undefined, assetTracks: undefined, currentPosition: AssetMovementStub });
      selectedAssetSubscription.unsubscribe();
    });

    it('should update assetTracks when state is updated.', () => {
      const { component } = setup();
      const store = TestBed.get(Store);
      let currentState = { asset: AssetReducer.initialState };

      store.setState(currentState);
      component.mapStateToProps();

      let assetTracks;
      const assetTracksSubscription = component['assetTracks$'].subscribe(newAssetTracks => assetTracks = newAssetTracks);
      expect(assetTracks).toEqual([]);
      currentState = { ...currentState, asset: {
        ...currentState.asset, assetTracks: { [AssetTrackStub.assetId]: AssetTrackStub }
      } };
      store.setState(currentState);
      expect(assetTracks).toEqual([AssetTrackStub]);
      assetTracksSubscription.unsubscribe();
    });

    it('should update positionsForInspection when state is updated.', () => {
      const { component } = setup();
      const store = TestBed.get(Store);
      let currentState = { asset: AssetReducer.initialState };

      store.setState(currentState);
      component.mapStateToProps();

      const basePositionsForInspection = {
        1: {
          location: {
            longitude: 17.976566666666667,
            latitude: 56.5789
          },
          heading: 55,
          guid: '47fc3ee8-dd32-41a9-a733-ffe2021fdaed',
          timestamp: '2019-03-31T05:48:30Z',
          speed: 19.5
        },
        2: {
          location: {
            longitude: 18.029166666666665,
            latitude: 56.59851666666667
          },
          heading: 57,
          guid: '0152820f-33f0-4ee1-86a3-a2cd24d1e66c',
          timestamp: '2019-03-31T05:55:00Z',
          speed: 19.5
        }
      };

      let positionsForInspection;
      const positionsForInspectionSubscription =
        component.positionsForInspection$.subscribe(newPositionsForInspection => positionsForInspection = newPositionsForInspection);
      expect(positionsForInspection).toEqual({});
      currentState = { ...currentState, asset: {
        ...currentState.asset, positionsForInspection: basePositionsForInspection
      } };
      store.setState(currentState);
      expect(positionsForInspection).toEqual(basePositionsForInspection);
      positionsForInspectionSubscription.unsubscribe();
    });

    it('should update forecasts when state is updated.', () => {
      const { component } = setup();
      const store = TestBed.get(Store);
      let currentState = { asset: AssetReducer.initialState };

      store.setState(currentState);
      component.mapStateToProps();

      let forecasts;
      const forecastsSubscription = component['forecasts$'].subscribe(newForecasts => forecasts = newForecasts);
      expect(forecasts).toEqual({});
      currentState = { ...currentState, asset: {
        ...currentState.asset, forecasts: [AssetMovementStub.asset], assetMovements: { [AssetMovementStub.asset]: AssetMovementStub }
      } };
      store.setState(currentState);
      expect(forecasts).toEqual({ [AssetMovementStub.asset]: AssetMovementStub });
      forecastsSubscription.unsubscribe();
    });

  });

  describe('mapDispatchToProps', () => {
    function mapDispatchToPropsSetup() {
      const { component } = setup();
      const store = TestBed.get(Store);
      const dispatchSpy = spyOn(store, 'dispatch');
      component.mapDispatchToProps();
      return { component, dispatchSpy };
    }

    it('should dispatch MapSettingsActions.SaveViewport when saveViewport is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.saveViewport('key', { viewport: 'object-stuff' });

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new MapSettingsActions.SaveViewport({key: 'key', viewport: { viewport: 'object-stuff' }})
      );
    });

    it('should dispatch MapSettingsActions.SetVisibilityForAssetNames when setVisibilityForAssetNames is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.setVisibilityForAssetNames(true);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new MapSettingsActions.SetVisibilityForAssetNames(true)
      );
    });

    it('should dispatch MapSettingsActions.SetVisibilityForAssetSpeeds when setVisibilityForAssetSpeeds is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.setVisibilityForAssetSpeeds(true);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new MapSettingsActions.SetVisibilityForAssetSpeeds(true)
      );
    });

    it('should dispatch MapSettingsActions.SetVisibilityForTracks when setVisibilityForTracks is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.setVisibilityForTracks(true);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new MapSettingsActions.SetVisibilityForTracks(true)
      );
    });

    it('should dispatch MapSettingsActions.SetVisibilityForFlags when setVisibilityForFlags is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.setVisibilityForFlags(true);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new MapSettingsActions.SetVisibilityForFlags(true)
      );
    });

    it('should dispatch MapSettingsActions.SetVisibilityForForecast when setVisibilityForForecast is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.setVisibilityForForecast(true);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new MapSettingsActions.SetVisibilityForForecast(true)
      );
    });

    it('should dispatch MapSettingsActions.SetTracksMinuteCap when setTracksMinuteCap is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.setTracksMinuteCap(10);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new MapSettingsActions.SetTracksMinuteCap(10)
      );
    });

    it('should dispatch AssetActions.SelectAsset when selectAsset is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component['selectAsset']('asset-id');

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.SelectAsset('asset-id')
      );
    });

    it('should dispatch AssetActions.GetAssetTrack when getAssetTrack is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component['getAssetTrack']('asset-id', 'movement-guid');

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.GetAssetTrack({ assetId: 'asset-id', movementGuid: 'movement-guid' })
      );
    });

    it('should dispatch AssetActions.GetAssetTrackFromTime when getAssetTrackFromTime is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      const datetime = new Date(Date.now());
      component['getAssetTrackFromTime']('asset-id', datetime);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.GetAssetTrackFromTime({ assetId: 'asset-id', datetime })
      );
    });

    it('should dispatch AssetActions.UntrackAsset when untrackAsset is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component['untrackAsset']('asset-id');

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.UntrackAsset('asset-id')
      );
    });

    it('should dispatch AssetActions.AddPositionForInspection when addPositionForInspection is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.addPositionForInspection({track: 'object-Stuff'});

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.AddPositionForInspection({track: 'object-Stuff'})
      );
    });

    it('should dispatch AssetActions.RemovePositionForInspection when removePositionForInspection is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.removePositionForInspection('track-id');

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.RemovePositionForInspection('track-id')
      );
    });

    it('should dispatch AssetActions.AddForecast when addForecast is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.addForecast('asset-id');

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.AddForecast('asset-id')
      );
    });

    it('should dispatch AssetActions.RemoveForecast when removeForecast is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component['removeForecast']('asset-id');

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.RemoveForecast('asset-id')
      );
    });

    it('should dispatch AssetActions.ClearForecasts when clearForecasts is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.clearForecasts();

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.ClearForecasts()
      );
    });

    it('should dispatch AssetActions.clearTracks when clearTracks is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.clearTracks();

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new AssetActions.ClearTracks()
      );
    });

    it('should dispatch MapSettingsActions.SetForecastInterval when setForecastInterval is called.', () => {
      const { component, dispatchSpy } = mapDispatchToPropsSetup();

      expect(dispatchSpy).toHaveBeenCalledTimes(0);
      component.setForecastInterval(11);

      expect(dispatchSpy).toHaveBeenCalledTimes(1);
      expect(dispatchSpy).toHaveBeenCalledWith(
        new MapSettingsActions.SetForecastInterval(11)
      );
    });


  });

  describe('Initialization', () => {
    function initializationSetup() {
      const { component } = setup();
      const store = TestBed.get(Store);
      const currentState = { asset: AssetReducer.initialState, mapSettings: MapSettingsReducer.initialState };
      store.setState(currentState);
      component.ngOnInit();
      return { component, store, currentState };
    }

    it('should initialize a map and respond to move events', () => {
      const { component } = initializationSetup();

      expect(component['mapZoom']).toEqual(6);

      component.map.getView().setZoom(2);
      expect(component['mapZoom']).toEqual(6);
      component.map.dispatchEvent({
        type: 'moveend'
      });
      expect(component['mapZoom']).toEqual(2);
    });

    it('should mount and unmount selection functions', () => {
      const { component } = initializationSetup();

      let run = 0;
      component.registerOnClickFunction('test', (event) => {
        run += 1;
      });
      component['selection'].dispatchEvent({
        type: 'select',
        selected: [],
        deselected: []
      });

      expect(run).toEqual(1);
      component['unregisterOnClickFunction']('test');
      component['selection'].dispatchEvent({
        type: 'select',
        selected: [],
        deselected: []
      });
      expect(run).toEqual(1);
    });

  });

});
