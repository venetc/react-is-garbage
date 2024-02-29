import { createContext, useCallback, useReducer } from 'react';

import type { Dispatch } from 'react';

import { LocalStorage } from '@/shared/lib/LocalStorage';

export const searchEpisodesState = {
  name: '',
  episode: '',
};

export type SearchEpisodesState = typeof searchEpisodesState;

const getInitialState = (initialState: SearchEpisodesState) => LocalStorage.get<SearchEpisodesState>('episodes') ?? initialState;

export type SearchEpisodesActions =
  | { type: 'set-name'; value: string }
  | { type: 'set-episode'; value: string };

export const SearchEpisodesContext = createContext<[SearchEpisodesState, Dispatch<SearchEpisodesActions>]>([searchEpisodesState, () => null]);

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
  }, [dispatch]);
  const clearEpisodeName = useCallback(() => {
    dispatch({ type: 'set-name', value: '' });
  }, [dispatch]);

  const setEpisodeToken = useCallback((value: string) => {
    dispatch({ type: 'set-episode', value });
  }, [dispatch]);
  const clearEpisodeToken = useCallback(() => {
    dispatch({ type: 'set-episode', value: '' });
  }, [dispatch]);

  return {
    state,
    setEpisodeName,
    clearEpisodeName,
    setEpisodeToken,
    clearEpisodeToken,
  };
}

export type EpisodesQueryAdapter = ReturnType<typeof useEpisodesQuery>;
