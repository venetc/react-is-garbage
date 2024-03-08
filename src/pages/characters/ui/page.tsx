import { charactersPageRoute } from '../lib';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/shared/api';
import { CharacterImage } from '@/entities/character';
import { EntityField } from '@/shared/ui/EntityField';
import { LocationLink } from '@/shared/ui/LocationLink';
import { getLinkId } from '@/shared/lib/getLinkId';
import { EpisodesList } from '@/widgets/characters-dataset';
import { Skeleton } from '@/shared/ui/Skeleton';

export default function CharactersPage() {
  const { id } = charactersPageRoute.useParams();

  const { data: character, isLoading: isCharacterLoading } = useQuery({
    queryKey: ['character', id],
    queryFn: () => api.characters.get(id),
  });

  const episodesIds = character
    ? character.episode.reduce((result, episode) => {
      const episodeId = episode.split('/').pop();

      if (episodeId && !Number.isNaN(+episodeId)) result.push(episodeId);

      return result;
    }, [] as string[])
    : [];

  const { data: episodes, isLoading: isEpisodesLoading } = useQuery({
    queryKey: ['episode', ...episodesIds],
    queryFn: () => api.episodes.get(episodesIds),
    enabled: !!episodesIds.length,
  });

  const originId = character?.origin.url ? getLinkId(character.origin.url) : '';
  const locationId = character?.location.url ? getLinkId(character.location.url) : '';

  return (
    <div className="
    max-w-screen-xl mx-auto py-10 px-5 space-y-4
    max-lg:px-2 max-lg:max-w-screen-sm
    "
    >
      <div className="
      bg-white rounded-md shadow p-3
      grid grid-rows-4 grid-cols-4 gap-x-6 items-stretch
      max-lg:block max-lg:space-y-3
      "
      >
        <div className="
        font-nunito text-navy-500 leading-none text-4xl font-semibold drop-shadow self-center
        col-start-2 col-end-5 row-start-1 row-end-2
        max-lg:text-center
        "
        >
          <Skeleton isLoading={isCharacterLoading} className="w-1/2 h-[1em]">
            {character?.name}
          </Skeleton>
        </div>
        <div className="col-start-1 col-end-2 row-start-1 row-end-5">
          <Skeleton isLoading={isCharacterLoading} className="w-full aspect-square">
            {character && <CharacterImage image={character.image} name={character.name} width={286} height={286} className="w-full aspect-square" />}
          </Skeleton>
        </div>
        <div className="col-start-2 col-end-5 row-start-2 row-end-5 leading-none space-y-1.5">
          <Skeleton isLoading={isCharacterLoading} className="w-1/4 h-3">
            {character && <EntityField label="Gender:" field={character.gender} />}
          </Skeleton>
          <Skeleton isLoading={isCharacterLoading} className="w-1/4 h-3">
            {character && <EntityField label="Species:" field={character.species} />}
          </Skeleton>
          <Skeleton isLoading={isCharacterLoading} className="w-1/4 h-3">
            {character && <EntityField label="Status:" field={character.status} spoiler />}
          </Skeleton>
          <Skeleton isLoading={isCharacterLoading} className="w-1/4 h-3">
            {character?.type && <EntityField label="Type:" field={character.type} />}
          </Skeleton>
          <Skeleton isLoading={isCharacterLoading} className="w-1/4 h-3">
            {character && originId && <LocationLink type="location" label="Origin:" name={character.origin.name} id={originId} />}
          </Skeleton>
          <Skeleton isLoading={isCharacterLoading} className="w-1/4 h-3">
            {character && locationId && <LocationLink type="location" label="Location:" name={character.location.name} id={locationId} />}
          </Skeleton>
        </div>
      </div>

      {episodesIds.length > 0 && (
        <div>
          <div className="font-fira_code font-semibold text-2xl text-navy-600 px-3 mb-2">
            Episodes:
          </div>
          <Skeleton isLoading={isEpisodesLoading} className="w-full h-16">
            <div className="bg-white px-3 py-3 rounded-md shadow flex-1 space-y-3 max-lg:w-full max-sm:p-2">
              {episodes && <EpisodesList episodes={episodes} />}
            </div>
          </Skeleton>
        </div>
      )}
    </div>
  );
}
