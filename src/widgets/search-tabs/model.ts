import type { CharactersQueryAdapter } from '@/features/search-characters';

export interface SearchTabsProps {
  onTabChange?: (tab: typeof tabs[number]) => void;
  charactersQuery: CharactersQueryAdapter;
}

export const tabs = ['Characters', 'Locations', 'Episodes'] as const;
