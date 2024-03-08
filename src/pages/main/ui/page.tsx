import { useCallback, useState } from 'react';

import type { SearchTab } from '@/widgets/search-tabs';

import { SearchCharactersContext, useCharacters, useCharactersQuery } from '@/features/search-characters';
import { SearchLocationsContext, useLocations, useLocationsQuery } from '@/features/search-locations';
import { SearchEpisodesContext, useEpisodes, useEpisodesQuery } from '@/features/search-episodes';
import { SearchTabs } from '@/widgets/search-tabs';
import { CharactersList, EpisodesList, LocationsList } from '@/widgets/characters-dataset';
import { useObserver } from '@/shared/lib/useObserver';
import { useError } from '@/shared/lib/useError';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState<SearchTab>('Characters');

  const charactersQuery = useCharactersQuery();
  const locationsQuery = useLocationsQuery();
  const episodesQuery = useEpisodesQuery();

  const charactersRequest = useCharacters({ state: charactersQuery.state, isActive: activeTab === 'Characters' });
  const episodesRequest = useEpisodes({ state: episodesQuery.state, isActive: activeTab === 'Episodes' });
  const locationsRequest = useLocations({ state: locationsQuery.state, isActive: activeTab === 'Locations' });

  const activeData = activeTab === 'Characters'
    ? charactersRequest
    : activeTab === 'Episodes'
      ? episodesRequest
      : locationsRequest;

  useError(activeData.isError);

  const onObserverChange = (isVisible: boolean) => {
    if (activeData.isFetching || !isVisible) return;
    activeData.fetchNextPage();
  };

  const { ref } = useObserver({ onChange: onObserverChange });

  const onTabChange = useCallback((tab: SearchTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setActiveTab]);

  return (
    <div className="container mx-auto py-10 px-5 flex justify-between items-start gap-4 max-lg:flex-col max-lg:px-2">
      <div className="bg-white rounded-md shadow max-w-72 w-full max-lg:max-w-full sticky top-10 max-lg:static">

        <SearchCharactersContext.Provider value={charactersQuery}>
          <SearchLocationsContext.Provider value={locationsQuery}>
            <SearchEpisodesContext.Provider value={episodesQuery}>
              <SearchTabs onTabChange={onTabChange} />
            </SearchEpisodesContext.Provider>
          </SearchLocationsContext.Provider>
        </SearchCharactersContext.Provider>

      </div>
      <div className="bg-white px-3 py-3 rounded-md shadow flex-1 space-y-3 max-lg:w-full max-sm:p-2">
        {
           activeData.status === 'error'
             ? (
               <div className=" border-navy-50 text-navy-600 shadow-inner shadow-navy-50 font-nunito border-2 rounded-md min-h-44 flex flex-col items-center justify-center">
                 <div className="text-2xl font-bold">Ooh Wee!</div>
                 {activeData.error?.message.includes('404')
                   ? (
                     <>
                       <div className="mt-2 font-fira_code text-sm">Nothing was found</div>
                       <div className="font-fira_code text-sm">Try less strict search params</div>
                     </>
                     )
                   : (
                     <>
                       <div className="mt-2 font-fira_code text-sm">Something went wrong</div>
                       <div className="font-fira_code text-sm">{activeData.error?.message}</div>
                     </>
                     )}
               </div>
               )
             : activeData.status === 'pending'
               ? 'Loading'
               : (
                 <>
                   { activeTab === 'Characters' && (
                     <CharactersList
                       characters={charactersRequest.dataList}
                       onSpeciesClick={charactersQuery.setCharacterSpecies}
                       onTypeClick={charactersQuery.setCharacterType}
                       onStatusClick={charactersQuery.setCharacterStatus}
                       onGenderClick={charactersQuery.setCharacterGender}
                     />
                   )}
                   { activeTab === 'Locations' && (
                     <LocationsList
                       locations={locationsRequest.dataList}
                       onTypeClick={locationsQuery.setLocationType}
                       onDimensionClick={locationsQuery.setLocationDimension}
                     />
                   )}
                   { activeTab === 'Episodes' && (
                     <EpisodesList
                       episodes={episodesRequest.dataList}
                       onTokenClick={episodesQuery.setEpisodeToken}
                     />
                   )}
                 </>
                 )
              }

        { activeData.hasNextPage && (
          <div
            ref={ref}
            className="flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-auto text-navy-500 animate-spin" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" />
              <path fill="currentColor" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" />
            </svg>
          </div>
        )}

      </div>
    </div>
  );
}
