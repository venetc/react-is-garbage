import { createContext, useCallback, useReducer } from 'react';

import type { Dispatch } from 'react';

import { LocalStorage } from '@/shared/lib/LocalStorage';

export const searchLocationsState = {
  name: '',
  type: '',
  dimension: '',
};

export type SearchLocationsState = typeof searchLocationsState;

const getInitialState = (initialState: SearchLocationsState) => LocalStorage.get<SearchLocationsState>('locations') ?? initialState;

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

export function useLocationsQuery() {
  const [state, dispatch] = useReducer(locationsQueryReducer, searchLocationsState, getInitialState);

  const setLocationName = useCallback((value: string) => {
    dispatch({ type: 'set-name', value });
  }, [dispatch]);
  const clearLocationName = useCallback(() => {
    dispatch({ type: 'set-name', value: '' });
  }, [dispatch]);

  const setLocationType = useCallback((value: string) => {
    dispatch({ type: 'set-type', value });
  }, [dispatch]);
  const clearLocationType = useCallback(() => {
    dispatch({ type: 'set-type', value: '' });
  }, [dispatch]);

  const setLocationDimension = useCallback((value: string) => {
    dispatch({ type: 'set-dimension', value });
  }, [dispatch]);
  const clearLocationDimension = useCallback(() => {
    dispatch({ type: 'set-dimension', value: '' });
  }, [dispatch]);

  return {
    state,
    setLocationName,
    clearLocationName,
    setLocationType,
    clearLocationType,
    setLocationDimension,
    clearLocationDimension,
  };
}

export type LocationsQueryAdapter = ReturnType<typeof useLocationsQuery>;
