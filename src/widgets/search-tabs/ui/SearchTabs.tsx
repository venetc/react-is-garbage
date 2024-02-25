import { type SearchTabsProps, tabs } from '../model';

import { useState } from 'react';

import { SearchCharactersContext, SearchCharactersFieldset } from '@/features/search-characters';
import { SearchEpisodesContext, SearchEpisodesFieldset } from '@/features/search-episodes';
import { SearchLocationsContext, SearchLocationsFieldset } from '@/features/search-locations';

export function SearchTabs(props: SearchTabsProps) {
  const { characters, locations, episodes, onTabChange } = props;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = tabs[activeTabIndex];

  const changeTab = (index: number) => {
    setActiveTabIndex(index);
    onTabChange?.(tabs[index]);
  };

  return (
    <SearchCharactersContext.Provider value={characters}>
      <SearchLocationsContext.Provider value={locations}>
        <SearchEpisodesContext.Provider value={episodes}>
          <div className="flex justify-between">
            { tabs.map((label, index) => (
              <TabLabel
                key={label}
                label={label}
                index={index}
                activeTabIndex={activeTabIndex}
                changeTab={changeTab}
              />
            ))}
          </div>

          {activeTab === 'Characters' && <SearchCharactersFieldset />}
          {activeTab === 'Locations' && <SearchLocationsFieldset />}
          {activeTab === 'Episodes' && <SearchEpisodesFieldset />}

        </SearchEpisodesContext.Provider>
      </SearchLocationsContext.Provider>
    </SearchCharactersContext.Provider>
  );
}

interface TabLabelProps {
  label: string;
  index: number;
  activeTabIndex: number;
  changeTab: (index: number) => void;
}
function TabLabel(props: TabLabelProps) {
  const { label, index, activeTabIndex, changeTab } = props;
  return (
    <div
      key={label}
      onClick={() => changeTab(index)}
      className={`
              ${index === activeTabIndex ? 'border-b-0' : 'border-b cursor-pointer bg-navy-50'} 
              ${index === 0 ? 'border-l-0' : 'border-l'}
              text-center flex-1 py-3 leading-none transition-colors text-sm
              `}
    >
      {label}
    </div>
  );
}
