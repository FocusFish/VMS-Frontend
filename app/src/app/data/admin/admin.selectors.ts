import { State } from "@app/app-reducer";
import { createSelector } from "@ngrx/store";
import { AdminTypes } from ".";

const selectAdmin = (state: State) => state.admin;

export const getCatalogs = createSelector(
  selectAdmin,
  (state: AdminTypes.State) => state.configuration.catalogs
);

export const getGlobals = createSelector(
  selectAdmin,
  (state: AdminTypes.State) => state.configuration.globals
);

export const getPings = createSelector(
  selectAdmin,
  (state: AdminTypes.State) => state.configuration.pings
);

export const getStates = createSelector(
  selectAdmin,
  (state: AdminTypes.State) => state.states
);
