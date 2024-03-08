import { searchEpisodes } from './api';

import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { LocalStorage } from '@/shared/lib/LocalStorage';
import { useDebounce } from '@/shared/lib/useDebounce';

export const searchEpisodesState = {
  name: '',
  episode: '',
};

export type SearchEpisodesState = typeof searchEpisodesState;

const getInitialState = (initialState: SearchEpisodesState) => LocalStorage.get<SearchEpisodesState>('episodes') ?? initialState;

export type SearchEpisodesActions =
  | { type: 'set-name'; value: string }
  | { type: 'set-episode'; value: string };

export const SearchEpisodesContext = createContext<EpisodesQueryAdapter | null>(null);

export function episodesQueryReducer(state: SearchEpisodesState, action: SearchEpisodesActions): SearchEpisodesState {
  switch (action.type) {
    case 'set-name':
      return { ...state, name: action.value };
    case 'set-episode':
      return { ...state, episode: action.value };
    default:
      return state;
  }
}

export function useEpisodesQuery() {
  const [state, dispatch] = useReducer(episodesQueryReducer, searchEpisodesState, getInitialState);

  const setEpisodeName = useCallback((value: string) => {
    dispatch({ type: 'set-name', value });
  }, []);
  const clearEpisodeName = useCallback(() => {
    dispatch({ type: 'set-name', value: '' });
  }, []);

  const setEpisodeToken = useCallback((value: string) => {
    dispatch({ type: 'set-episode', value });
  }, []);
  const clearEpisodeToken = useCallback(() => {
    dispatch({ type: 'set-episode', value: '' });
  }, []);

  return useMemo(() => ({
    state,
    setEpisodeName,
    clearEpisodeName,
    setEpisodeToken,
    clearEpisodeToken,
  }), [
    state,
    setEpisodeName,
    clearEpisodeName,
    setEpisodeToken,
    clearEpisodeToken,
  ]);
}

export type EpisodesQueryAdapter = ReturnType<typeof useEpisodesQuery>;

export function useEpisodes({ state, isActive }: { state: SearchEpisodesState; isActive: boolean }) {
  const queryParams = useDebounce(state, 500);

  const trimmed = useMemo(() => ({
    name: queryParams.name.trim(),
    episode: queryParams.episode.trim(),
  }), [queryParams]);

  const { isFetching, data, error, fetchNextPage, status, isError, hasNextPage } = useInfiniteQuery({
    queryKey: ['episodes', trimmed],
    queryFn: ({ pageParam }) => searchEpisodes({ ...trimmed, page: pageParam.toString() }),
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
    LocalStorage.set('episodes', queryParams);
  }, [queryParams]);

  const dataList = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.results);
  }, [data]);

  return { isFetching, fetchNextPage, error, dataList, hasNextPage, status, isError };
}
