import { charactersPageRoute } from '../index';

export default function CharactersPage() {
  const x = charactersPageRoute.useParams();
  return (
    <div>
      {x.characterId}
    </div>
  );
}
