import { createReducer, on } from "@ngrx/store";
import { AdminActions, AdminTypes } from ".";

const initialState: AdminTypes.State = {
  configuration: {
    catalogs: {},
    globals: [],
    pings: {},
    reporting: {
      layerSettings: {},
      mapSettings: {},
      styleSettings: {},
      referenceDataSettings: {},
      systemSettings: {},
      toolSettings: {},
      visibilitySettings: {},
    },
  },
  states: {
    catalogsLoaded: false,
    globalsLoaded: false,
    pingsLoaded: false,
    reportingLoaded: false,
  },
};

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.setCatalogs, (state, { catalogs }) => ({
    ...state,
    configuration: {
      ...state.configuration,
      catalogs: { ...catalogs },
    },
    states: {
      ...state.states,
      catalogsLoaded: true,
    },
  })),
  on(AdminActions.setGlobals, (state, { globals }) => ({
    ...state,
    configuration: {
      ...state.configuration,
      globals: [...globals],
    },
    states: {
      ...state.states,
      globalsLoaded: true,
    },
  })),
  on(AdminActions.setPings, (state, { pings }) => ({
    ...state,
    configuration: {
      ...state.configuration,
      pings: { ...pings },
    },
    states: {
      ...state.states,
      pingsLoaded: true,
    },
  })),
  on(AdminActions.setReporting, (state, { reporting }) => ({
    ...state,
    configuration: {
      ...state.configuration,
      reporting: { ...reporting },
    },
    states: {
      ...state.states,
      reportingLoaded: true,
    },
  }))
);
