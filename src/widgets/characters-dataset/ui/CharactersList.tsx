import { type Character, CharacterRow } from '@/entities/character';

interface CharactersListProps extends React.HTMLAttributes<HTMLUListElement> {
  characters: Character[];
  onSpeciesClick: (value: string) => void;
  onTypeClick: (value: string) => void;
  onStatusClick: (value: string) => void;
  onGenderClick: (value: string) => void;
}
export function CharactersList(props: CharactersListProps) {
  const { characters, className, onSpeciesClick, onTypeClick, onStatusClick, onGenderClick, ...rest } = props;

  return (
    <ul className={`space-y-3 ${className ?? ''}`} {...rest}>
      {characters.map(character => (
        <CharacterRow
          key={character.id}
          character={character}
          onSpeciesClick={onSpeciesClick}
          onTypeClick={onTypeClick}
          onStatusClick={onStatusClick}
          onGenderClick={onGenderClick}
        />
      ))}
    </ul>
  );
}
