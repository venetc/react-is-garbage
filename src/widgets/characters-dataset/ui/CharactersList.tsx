import type { Dispatch } from 'react';
import type { SearchCharactersActions } from '@/features/search-characters';

import { type Character, CharacterRow } from '@/entities/character';

interface CharactersListProps extends React.HTMLAttributes<HTMLUListElement> {
  characters: Character[];
  charactersQueryDispatch: Dispatch<SearchCharactersActions>;
}
export function CharactersList(props: CharactersListProps) {
  const { characters, className, charactersQueryDispatch, ...rest } = props;

  return (
    <ul className={`space-y-3 ${className ?? ''}`} {...rest}>
      {characters.map(character => (
        <CharacterRow
          key={character.id}
          character={character}
          onSpeciesClick={value => charactersQueryDispatch({ type: 'set-species', value })}
          onTypeClick={value => charactersQueryDispatch({ type: 'set-type', value })}
          onStatusClick={value => charactersQueryDispatch({ type: 'set-status', value })}
          onGenderClick={value => charactersQueryDispatch({ type: 'set-gender', value })}
        />
      ))}
    </ul>
  );
}
