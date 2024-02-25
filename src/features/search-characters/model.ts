import { createContext, useReducer } from 'react';

import type { Dispatch } from 'react';

export const searchCharactersState = {
  name: '',
  species: '',
  type: '',
  status: '',
  gender: '',
};

export type SearchCharactersState = typeof searchCharactersState;

export type SearchCharactersActions =
  | { type: 'set-name'; value: string }
  | { type: 'set-species'; value: string }
  | { type: 'set-type'; value: string }
  | { type: 'set-status'; value: string }
  | { type: 'set-gender'; value: string }
  | { type: 'set-page'; value: number };

export const SearchCharactersContext = createContext<[SearchCharactersState, Dispatch<SearchCharactersActions>]>([searchCharactersState, () => null]);

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

export const useCharactersQuery = () => useReducer(charactersQueryReducer, searchCharactersState);
