import { searchLocations } from './api';

import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { LocalStorage } from '@/shared/lib/LocalStorage';
import { useDebounce } from '@/shared/lib/useDebounce';

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

export const SearchLocationsContext = createContext<LocationsQueryAdapter | null>(null);

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

  return useMemo(() => ({
    state,
    setLocationName,
    clearLocationName,
    setLocationType,
    clearLocationType,
    setLocationDimension,
    clearLocationDimension,
  }), [
    state,
    setLocationName,
    clearLocationName,
    setLocationType,
    clearLocationType,
    setLocationDimension,
    clearLocationDimension,
  ]);
}

export type LocationsQueryAdapter = ReturnType<typeof useLocationsQuery>;

export function useLocations({ state, isActive }: { state: SearchLocationsState; isActive: boolean }) {
  const queryParams = useDebounce(state, 500);

  const trimmed = useMemo(() => ({
    name: queryParams.name.trim(),
    type: queryParams.type.trim(),
    dimension: queryParams.dimension.trim(),
  }), [queryParams]);

  const { isFetching, data, error, fetchNextPage, status, isError, hasNextPage } = useInfiniteQuery({
    queryKey: ['locations', trimmed],
    queryFn: ({ pageParam }) => searchLocations({ ...trimmed, page: pageParam.toString() }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 6,
    refetchOnWindowFocus: false,
    enabled: isActive,
    retry: (_, error) => {
      if (error instanceof Error && error.message.includes('404')) return false;
      return true;
    },
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.info) return 1;
      if (!lastPage.info.next) return;
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    LocalStorage.set('locations', queryParams);
  }, [queryParams]);

  const dataList = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.results);
  }, [data]);

  return { isFetching, fetchNextPage, error, dataList, hasNextPage, status, isError };
}
