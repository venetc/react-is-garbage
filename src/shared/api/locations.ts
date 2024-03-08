import { BASE_URL } from './config';

import type { ApiResponseInfinite, Page } from './types';

export async function searchLocations(params: LocationsSearchParams & Page): Promise<ApiResponseInfinite<LocationDTO[]>> {
  const restParams = new URLSearchParams(params).toString().toLowerCase();

  const response = await fetch(`${BASE_URL}/location?${restParams}`);

  if (!response.ok) throw new Error(`Response code - ${response.status}`);

  return await response.json();
}

export type LocationsSearchParams = {
  name: string;
  type: string;
  dimension: string;
};

export interface LocationDTO {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
