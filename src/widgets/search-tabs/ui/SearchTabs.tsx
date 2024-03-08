import { type SearchTabsProps, tabs } from '../model';

import { memo, useState } from 'react';

import { SearchCharactersFieldset } from '@/features/search-characters';
import { SearchEpisodesFieldset } from '@/features/search-episodes';
import { SearchLocationsFieldset } from '@/features/search-locations';

export const SearchTabs = memo((props: SearchTabsProps) => {
  const { onTabChange } = props;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = tabs[activeTabIndex];

  const changeTab = (index: number) => {
    setActiveTabIndex(index);
    onTabChange?.(tabs[index]);
  };

  return (
    <>
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
    </>

  );
});

SearchTabs.displayName = 'SearchTabs';

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
