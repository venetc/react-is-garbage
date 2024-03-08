import { searchCharacters } from './api';

import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { LocalStorage } from '@/shared/lib/LocalStorage';
import { useDebounce } from '@/shared/lib/useDebounce';

export const searchCharactersState = {
  name: '',
  species: '',
  type: '',
  status: '',
  gender: '',
};

export type SearchCharactersState = typeof searchCharactersState;

const getInitialState = (initialState: SearchCharactersState) => LocalStorage.get<SearchCharactersState>('characters') ?? initialState;

export type SearchCharactersActions =
  | { type: 'set-name'; value: string }
  | { type: 'set-species'; value: string }
  | { type: 'set-type'; value: string }
  | { type: 'set-status'; value: string }
  | { type: 'set-gender'; value: string };

export const SearchCharactersContext = createContext<CharactersQueryAdapter | null>(null);

export function charactersQueryReducer(state: SearchCharactersState, action: SearchCharactersActions): SearchCharactersState {
  switch (action.type) {
    case 'set-name':
      return { ...state, name: action.value };
    case 'set-species':
      return { ...state, species: action.value };
    case 'set-type':
      return { ...state, type: action.value };
    case 'set-status':
      return { ...state, status: action.value };
    case 'set-gender':
      return { ...state, gender: action.value };
    default:
      return state;
  }
}

export function useCharactersQuery() {
  const [state, dispatch] = useReducer(charactersQueryReducer, searchCharactersState, getInitialState);

  const setCharacterName = useCallback((value: string) => {
    dispatch({ type: 'set-name', value });
  }, []);
  const clearCharacterName = useCallback(() => {
    dispatch({ type: 'set-name', value: '' });
  }, []);

  const setCharacterSpecies = useCallback((value: string) => {
    dispatch({ type: 'set-species', value });
  }, []);
  const clearCharacterSpecies = useCallback(() => {
    dispatch({ type: 'set-species', value: '' });
  }, []);

  const setCharacterType = useCallback((value: string) => {
    dispatch({ type: 'set-type', value });
  }, []);
  const clearCharacterType = useCallback(() => {
    dispatch({ type: 'set-type', value: '' });
  }, []);

  const setCharacterStatus = useCallback((value: string) => {
    dispatch({ type: 'set-status', value });
  }, []);
  const clearCharacterStatus = useCallback(() => {
    dispatch({ type: 'set-status', value: '' });
  }, []);

  const setCharacterGender = useCallback((value: string) => {
    dispatch({ type: 'set-gender', value });
  }, []);
  const clearCharacterGender = useCallback(() => {
    dispatch({ type: 'set-gender', value: '' });
  }, []);

  return useMemo(() => ({
    state,
    setCharacterName,
    clearCharacterName,
    setCharacterSpecies,
    clearCharacterSpecies,
    setCharacterType,
    clearCharacterType,
    setCharacterStatus,
    clearCharacterStatus,
    setCharacterGender,
    clearCharacterGender,
  }), [
    state,
    setCharacterName,
    clearCharacterName,
    setCharacterSpecies,
    clearCharacterSpecies,
    setCharacterType,
    clearCharacterType,
    setCharacterStatus,
    clearCharacterStatus,
    setCharacterGender,
    clearCharacterGender,
  ]);
}

export type CharactersQueryAdapter = ReturnType<typeof useCharactersQuery>;

export function useCharacters({ state, isActive }: { state: SearchCharactersState; isActive: boolean }) {
  const queryParams = useDebounce(state, 500);

  const trimmed = useMemo(() => ({
    name: queryParams.name.trim(),
    species: queryParams.species.trim(),
    type: queryParams.type.trim(),
    status: queryParams.status.trim(),
    gender: queryParams.gender.trim(),
  }), [queryParams]);

  const { isFetching, data, error, fetchNextPage, status, isError, hasNextPage } = useInfiniteQuery({
    queryKey: ['characters', trimmed],
    queryFn: ({ pageParam }) => searchCharacters({ ...trimmed, page: pageParam.toString() }),
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
    LocalStorage.set('characters', queryParams);
  }, [queryParams]);

  const dataList = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.results);
  }, [data]);

  return { isFetching, fetchNextPage, error, dataList, hasNextPage, status, isError };
}
