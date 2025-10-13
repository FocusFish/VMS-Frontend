import { createReducer, on } from "@ngrx/store";
import { AdminActions, AdminTypes } from ".";

const initialState: AdminTypes.State = {
  configuration: {
    pings: {},
    catalogs: {},
  },
};

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.setPings, (state, { pings }) => ({
    ...state,
    configuration: {
      ...state.configuration,
      pings: { ...pings },
    },
  })),
  on(AdminActions.setCatalogs, (state, { catalogs }) => ({
    ...state,
    configuration: {
      ...state.configuration,
      catalogs: { ...catalogs },
    },
  }))
);
