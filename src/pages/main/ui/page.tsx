import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import type { SearchCharactersState } from '@/features/search-characters';
import type { Character } from '@/entities/character';

import { useCharactersQuery } from '@/features/search-characters';
import { useLocationsQuery } from '@/features/search-locations';
import { useEpisodesQuery } from '@/features/search-episodes';
import { SearchTabs } from '@/widgets/search-tabs';
import { CharactersList } from '@/widgets/characters-dataset';
import { useOnScreen } from '@/shared/lib/useObserver';

export default function MainPage() {
  const charactersQueryReducer = useCharactersQuery();
  const locations = useLocationsQuery();
  const episodes = useEpisodesQuery();

  const queryParams = useDebounce(charactersQueryReducer[0], 500);
  const trimmedParams = {
    name: queryParams.name.trim(),
    species: queryParams.species.trim(),
    type: queryParams.type.trim(),
    status: queryParams.status.trim(),
    gender: queryParams.gender.trim(),
  };

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(aboutRef);

  const { data, error, fetchNextPage, status, isError, isLoading, isFetching } = useInfiniteQuery({
    queryKey: ['characters', trimmedParams],
    queryFn: ({ pageParam }) => fetchCharacters({ ...trimmedParams, page: `${pageParam}` }),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 6,
    retry: (_, error) => {
      if (error instanceof Error && error.message.includes('404')) return false;
      return true;
    },
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.info) return 1;
      if (!lastPage.info.next) return;
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (!isVisible || isLoading || isFetching) return;

    fetchNextPage();
  }, [isVisible, isLoading, fetchNextPage, isFetching]);

  useEffect(() => {
    if (isError) console.log('ой ей');
  }, [isError]);

  const charactersList = data?.pages.flatMap(page => page.results) || [];

  return (
    <div className="container mx-auto py-10 px-5 flex justify-between items-start gap-4 max-lg:flex-col max-lg:px-2">
      <div className="bg-white rounded-md shadow max-w-72 w-full max-lg:max-w-full sticky top-10 max-lg:static">
        <SearchTabs
          characters={charactersQueryReducer}
          locations={locations}
          episodes={episodes}
          onTabChange={console.log}
        />

      </div>
      <div className="bg-white px-3 py-3 rounded-md shadow flex-1 space-y-3 max-lg:w-full">
        {
           status === 'error'
             ? (
               <p>
                 Error:
                 {error.message}
               </p>
               )
             : <CharactersList characters={charactersList} charactersQueryDispatch={charactersQueryReducer[1]} />
              }
        {
              data
              && data.pages[data.pages.length - 1].info.next
              && <div ref={aboutRef} className="border leading-none px-2 py-1 rounded-md mt-3 mb-2" onClick={() => fetchNextPage()}>Next</div>
              }

      </div>

    </div>
  );
}

interface ResponseF {
  info: { count: number; next: string | null; pages: number; prev: string | null };
  results: Character[];
}

async function fetchCharacters(params: SearchCharactersState & { page: string }): Promise<ResponseF> {
  const restParams = new URLSearchParams(params).toString().toLowerCase();
  const response = await fetch(`https://rickandmortyapi.com/api/character?${restParams}`);

  if (!response.ok) throw new Error(`Response status - ${response.status}`);

  return response.json();
}

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const t = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(t);
      };
    },
    [value, delay],
  );
  return debouncedValue;
}
