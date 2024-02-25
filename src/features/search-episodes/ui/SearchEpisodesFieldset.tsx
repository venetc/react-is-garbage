import { SearchEpisodesContext } from '../model';

import { useContext } from 'react';

import { TextInputComponent } from '@/shared/ui/TextInputComponent';

export function SearchEpisodesFieldset() {
  const [state, dispatch] = useContext(SearchEpisodesContext);

  return (
    <div className="px-3 pb-4 pt-4 space-y-4">
      <TextInputComponent
        label="Name"
        placeholder="Rick"
        onChange={e => dispatch({ type: 'set-name', value: e.target.value })}
        value={state.name}
      />
      <TextInputComponent
        label="Episode"
        placeholder="S01E06"
        onChange={e => dispatch({ type: 'set-episode', value: e.target.value })}
        value={state.episode}
      />
    </div>
  );
}
