import { BASE_URL } from './config';

import type { ApiResponseInfinite, Page, Simplify } from './types';

export async function searchCharacters(params: CharactersSearchParams & Page): Promise<Simplify<ApiResponseInfinite<CharacterDTO[]>>> {
  const restParams = new URLSearchParams(params).toString().toLowerCase();

  const response = await fetch(`${BASE_URL}/character?${restParams}`);

  if (!response.ok) throw new Error(`Response code - ${response.status}`);

  return await response.json();
}

export async function getCharacters<T extends string | string[]>(id: T): Promise<T extends string ? CharacterDTO : CharacterDTO[]> {
  const ids = Array.isArray(id) ? id : [id];
  const endpoint = ids.join(',');

  const response = await fetch(`${BASE_URL}/character/${endpoint}`);

  if (!response.ok) throw new Error(`Response code - ${response.status}`);

  return await response.json();
}

export type CharactersSearchParams = {
  name: string;
  species: string;
  type: string;
  status: string;
  gender: string;
};

export interface CharacterDTO {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
