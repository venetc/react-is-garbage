export interface SearchTabsProps {
  onTabChange?: (tab: typeof tabs[number]) => void;
}

export const tabs = ['Characters', 'Locations', 'Episodes'] as const;

export type SearchTab = typeof tabs[number];
