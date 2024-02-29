import { useCallback } from 'react';

import { useCharacters, useCharactersQuery } from '@/features/search-characters';
import { SearchTabs } from '@/widgets/search-tabs';
import { CharactersList } from '@/widgets/characters-dataset';
import { useObserver } from '@/shared/lib/useObserver';

export default function MainPage() {
  const charactersQuery = useCharactersQuery();
  // const locationsQuery = useLocationsQuery();
  // const episodesQuery = useEpisodesQuery();

  const { isFetching, fetchNextPage, error, charactersList, hasNextPage, status } = useCharacters({ state: charactersQuery.state, isActive: true });

  const onObserverChange = (isVisible: boolean) => {
    if (isFetching || !isVisible) return;
    fetchNextPage();
  };

  const { ref } = useObserver({ onChange: onObserverChange });

  const onTabChange = useCallback((v: 'Characters' | 'Locations' | 'Episodes') => {
    console.log(v);
  }, []);

  return (
    <div className="container mx-auto py-10 px-5 flex justify-between items-start gap-4 max-lg:flex-col max-lg:px-2">
      <div className="bg-white rounded-md shadow max-w-72 w-full max-lg:max-w-full sticky top-10 max-lg:static">
        <SearchTabs onTabChange={onTabChange} charactersQuery={charactersQuery} />
      </div>
      <div className="bg-white px-3 py-3 rounded-md shadow flex-1 space-y-3 max-lg:w-full">
        {
           status === 'error'
             ? (
               <div className=" border-navy-50 text-navy-600 shadow-inner shadow-navy-50 font-nunito border-2 rounded-md min-h-44 flex flex-col items-center justify-center">
                 <div className="text-2xl font-bold">Ooh Wee!</div>
                 {error?.message.includes('404')
                   ? (
                     <>
                       <div className="mt-2 font-fira_code text-sm">Nothing was found</div>
                       <div className="font-fira_code text-sm">Try less strict search params</div>
                     </>
                     )
                   : (
                     <>
                       <div className="mt-2 font-fira_code text-sm">Something went wrong</div>
                       <div className="font-fira_code text-sm">{error?.message}</div>
                     </>
                     )}
               </div>
               )
             : (
               <CharactersList
                 characters={charactersList}
                 onSpeciesClick={charactersQuery.setCharacterSpecies}
                 onTypeClick={charactersQuery.setCharacterType}
                 onStatusClick={charactersQuery.setCharacterStatus}
                 onGenderClick={charactersQuery.setCharacterGender}
               />
               )
              }

        { hasNextPage && (
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
