import { BASE_URL } from './config';

import type { ApiResponseInfinite, Page } from './types';

export async function searchEpisodes(params: EpisodesSearchParams & Page): Promise<ApiResponseInfinite<EpisodeDTO[]>> {
  const restParams = new URLSearchParams(params).toString().toLowerCase();

  const response = await fetch(`${BASE_URL}/episode?${restParams}`);

  if (!response.ok) throw new Error(`Response code - ${response.status}`);

  return await response.json();
}

export async function getEpisodes<T extends string | string[]>(id: T): Promise<EpisodeDTO[] > {
  const ids = Array.isArray(id) ? id : [id];
  const endpoint = ids.join(',');

  const response = await fetch(`${BASE_URL}/episode/${endpoint}`);

  if (!response.ok) throw new Error(`Response code - ${response.status}`);

  const data = await response.json();

  return Array.isArray(data) ? data : [data];
}

export type EpisodesSearchParams = {
  name: string;
  episode: string;
};

export interface EpisodeDTO {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
