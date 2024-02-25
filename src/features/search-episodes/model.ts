import { createContext, useReducer } from 'react';

import type { Dispatch } from 'react';

export const searchEpisodesState = {
  name: '',
  episode: '',
};

export type SearchEpisodesState = typeof searchEpisodesState;

export type SearchEpisodesActions =
  | { type: 'set-name'; value: string }
  | { type: 'set-episode';value: string };

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

export const useEpisodesQuery = () => useReducer(episodesQueryReducer, searchEpisodesState);
