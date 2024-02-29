import { SearchEpisodesContext } from '../model';

import { memo, useCallback, useContext } from 'react';

import type { ChangeEvent } from 'react';

import { TextInputComponent } from '@/shared/ui/TextInputComponent';

export const SearchEpisodesFieldset = memo(() => {
  const [state, dispatch] = useContext(SearchEpisodesContext);

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-name', value: e.target.value });
  }, [dispatch]);
  const onNameClear = useCallback(() => {
    dispatch({ type: 'set-name', value: '' });
  }, [dispatch]);

  const onEpisodeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set-episode', value: e.target.value });
  }, [dispatch]);
  const onEpisodeClear = useCallback(() => {
    dispatch({ type: 'set-episode', value: '' });
  }, [dispatch]);

  return (
    <div className="px-3 pb-4 pt-4 space-y-4">
      <TextInputComponent
        label="Name"
        placeholder="Rick"
        onChange={onNameChange}
        onClear={onNameClear}
        value={state.name}
      />
      <TextInputComponent
        label="Episode"
        placeholder="S01E06"
        onChange={onEpisodeChange}
        onClear={onEpisodeClear}
        value={state.episode}
      />
    </div>
  );
});

SearchEpisodesFieldset.displayName = 'SearchEpisodesFieldset';
