import { CharacterName } from './CharacterName';
import { CharacterImage } from './CharacterImage';
import { CharacterLocationLink } from './CharacterLocationLink';

import { memo } from 'react';

import type { HTMLAttributes } from 'react';
import type { Character } from '../model';

import { EntityField } from '@/shared/ui/EntityField';

interface CharacterRowProps extends HTMLAttributes<HTMLLIElement> {
  character: Character;
  onSpeciesClick: (species: Character['species']) => void;
  onTypeClick: (type: Character['type']) => void;
  onStatusClick: (status: Character['status']) => void;
  onGenderClick: (gender: Character['gender']) => void;
}

function CharacterRowComponent(props: CharacterRowProps) {
  const { character, onSpeciesClick, onTypeClick, onStatusClick, onGenderClick, ...rest } = props;
  return (
    <li
      className="
    font-nunito
    shadow-sm shadow-navy-100 border rounded-md border-navy-100 transition-[box-shadow,border-color]
    hover:shadow-md hover:border-navy-200 hover:shadow-navy-200
    group
    "
      {...rest}
    >
      <div className="
      flex gap-2 items-stretch
      max-sm:block
      "
      >
        <CharacterImage
          image={character.image}
          name={character.name}
          className="
        min-h-20 basis-20 h-auto
        max-sm:w-full
        "
        />
        <div className="
        flex flex-auto basis-10/12 items-center py-2 pr-2 gap-x-2
        max-sm:flex-col max-sm:px-2 max-sm:gap-y-3
        "
        >
          <div className="basis-3/12 max-xl:basis-4/12">
            <CharacterName
              name={character.name}
              characterId={character.id.toString()}
              className="
            font-bold
            max-sm:text-2xl
            "
            />
          </div>

          <div className="
          basis-9/12 grid grid-cols-2 grid-rows-3 grid-flow-col gap-x-6 gap-y-0.5 text text-xs
          max-xl:basis-8/12 max-xl:text-sm max-xl:gap-x-2 max-xl:gap-y-1
          max-sm:w-full max-sm:grid-cols-1
          "
          >
            <EntityField
              label="Gender:"
              field={character.gender}
              onFieldClick={onGenderClick}
              emitLowercase
            />
            <EntityField
              label="Species:"
              field={character.species}
              onFieldClick={onSpeciesClick}
            />
            <EntityField
              label="Status:"
              field={character.status}
              onFieldClick={onStatusClick}
              emitLowercase
            />
            <CharacterLocationLink
              className="
              max-xl:row-start-3 max-xl:col-start-1 max-xl:col-span-2
              max-sm:row-start-5
              "
              label="Location:"
              name={character.location.name}
              locationUrl={character.location.url}
            />
            <CharacterLocationLink
              className="
              max-xl:row-start-4 max-xl:col-start-1 max-xl:col-span-2
              max-sm:row-start-6
              "
              label="Origin:"
              name={character.origin.name}
              locationUrl={character.origin.url}
            />

            { character.type && <EntityField label="Type:" field={character.type} onFieldClick={onTypeClick} /> }
          </div>
        </div>
      </div>
    </li>
  );
}

const CharacterRow = memo(CharacterRowComponent);

export { CharacterRow };
