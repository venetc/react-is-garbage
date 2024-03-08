import { SearchEpisodesContext } from '../model';

import { memo, useContext } from 'react';

import type { ChangeEvent } from 'react';

import { TextInputComponent } from '@/shared/ui/TextInputComponent';

export const SearchEpisodesFieldset = memo(() => {
  const ctx = useContext(SearchEpisodesContext);

  if (!ctx) return null;

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => ctx.setEpisodeName(e.target.value);
  const onEpisodeChange = (e: ChangeEvent<HTMLInputElement>) => ctx.setEpisodeToken(e.target.value);

  return (
    <div className="px-3 pb-4 pt-4 space-y-4 max-sm:p-2">
      <TextInputComponent
        label="Name"
        placeholder="Rick"
        onChange={onNameChange}
        onClear={ctx.clearEpisodeName}
        value={ctx.state.name}
      />
      <TextInputComponent
        label="Episode"
        placeholder="S01E06"
        onChange={onEpisodeChange}
        onClear={ctx.clearEpisodeToken}
        value={ctx.state.episode}
      />
    </div>
  );
});

SearchEpisodesFieldset.displayName = 'SearchEpisodesFieldset';
