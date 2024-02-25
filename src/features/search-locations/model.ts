import { createContext, useReducer } from 'react';

import type { Dispatch } from 'react';

export const searchLocationsState = {
  name: '',
  type: '',
  dimension: '',
};

export type SearchLocationsState = typeof searchLocationsState;

export type SearchLocationsActions =
  | { type: 'set-name'; value: string }
  | { type: 'set-type';value: string }
  | { type: 'set-dimension';value: string };

export const SearchLocationsContext = createContext<[SearchLocationsState, Dispatch<SearchLocationsActions>]>([searchLocationsState, () => null]);

export function locationsQueryReducer(state: SearchLocationsState, action: SearchLocationsActions): SearchLocationsState {
  switch (action.type) {
    case 'set-name':
      return { ...state, name: action.value };
    case 'set-type':
      return { ...state, type: action.value };
    case 'set-dimension':
      return { ...state, dimension: action.value };
    default:
      return state;
  }
}

export const useLocationsQuery = () => useReducer(locationsQueryReducer, searchLocationsState);
