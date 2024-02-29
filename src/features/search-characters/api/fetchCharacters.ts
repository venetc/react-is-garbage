import type { SearchCharactersState } from '../model';
import type { Character } from '@/entities/character';

interface ResponseF {
  info: { count: number; next: string | null; pages: number; prev: string | null };
  results: Character[];
}

export async function fetchCharacters(params: SearchCharactersState & { page: string }): Promise<ResponseF> {
  const restParams = new URLSearchParams(params).toString().toLowerCase();
  const response = await fetch(`https://rickandmortyapi.com/api/character?${restParams}`);

  if (!response.ok) throw new Error(`Response code - ${response.status}`);

  return response.json();
}
