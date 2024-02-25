import type { Dispatch } from 'react';
import type { SearchCharactersActions, SearchCharactersState } from '@/features/search-characters';
import type { SearchEpisodesActions, SearchEpisodesState } from '@/features/search-episodes';
import type { SearchLocationsActions, SearchLocationsState } from '@/features/search-locations';

export interface SearchTabsProps {
  characters: [SearchCharactersState, Dispatch<SearchCharactersActions>];
  locations: [SearchLocationsState, Dispatch<SearchLocationsActions>];
  episodes: [SearchEpisodesState, Dispatch<SearchEpisodesActions>];
  onTabChange?: (tab: typeof tabs[number]) => void;
}

export const tabs = ['Characters', 'Locations', 'Episodes'] as const;
