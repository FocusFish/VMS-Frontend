import { createReducer, on } from "@ngrx/store";
import { AdminActions, AdminTypes } from ".";

const initialState: AdminTypes.State = {
  configuration: {
    catalogs: {},
    globals: [],
    pings: {},
  },
  states: {
    catalogsLoaded: false,
    globalsLoaded: false,
    pingsLoaded: false,
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
  }))
);
