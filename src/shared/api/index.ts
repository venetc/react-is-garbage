import { getCharacters, searchCharacters } from './characters';
import { getEpisodes, searchEpisodes } from './episodes';
import { searchLocations } from './locations';

export const api = {
  characters: {
    search: searchCharacters,
    get: getCharacters,
  },
  episodes: {
    search: searchEpisodes,
    get: getEpisodes,
  },
  locations: {
    search: searchLocations,
  },
};
