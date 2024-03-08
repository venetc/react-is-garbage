import { SearchCharactersContext } from '../model';

import { memo, useContext } from 'react';

import type { ChangeEvent } from 'react';

import { TextInputComponent } from '@/shared/ui/TextInputComponent';
import { DropdownComponent } from '@/shared/ui/DropdownComponents';

export const SearchCharactersFieldset = memo(() => {
  const ctx = useContext(SearchCharactersContext);

  if (!ctx) return null;

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => ctx.setCharacterName(e.target.value);
  const onSpeciesChange = (e: ChangeEvent<HTMLInputElement>) => ctx.setCharacterSpecies(e.target.value);
  const onTypeChange = (e: ChangeEvent<HTMLInputElement>) => ctx.setCharacterType(e.target.value);
  const onStatusChange = (e: ChangeEvent<HTMLSelectElement>) => ctx.setCharacterStatus(e.target.value);
  const onGenderChange = (e: ChangeEvent<HTMLSelectElement>) => ctx.setCharacterGender(e.target.value);

  return (
    <div className="px-3 pb-4 pt-4 space-y-4 max-sm:p-2">
      <TextInputComponent
        label="Name"
        placeholder="Rick"
        onChange={onNameChange}
        onClear={ctx.clearCharacterName}
        value={ctx.state.name}
      />
      <TextInputComponent
        label="Species"
        placeholder="Human"
        onChange={onSpeciesChange}
        onClear={ctx.clearCharacterSpecies}
        value={ctx.state.species}
      />
      <TextInputComponent
        label="Type"
        placeholder="Clone"
        onChange={onTypeChange}
        onClear={ctx.clearCharacterType}
        value={ctx.state.type}
      />
      <DropdownComponent
        label="Status"
        options={['Alive', 'Dead', 'Unknown']}
        onChange={onStatusChange}
        onClear={ctx.clearCharacterStatus}
        value={ctx.state.status}
      />
      <DropdownComponent
        label="Gender"
        options={['Female', 'Male', 'Genderless', 'Unknown']}
        onChange={onGenderChange}
        onClear={ctx.clearCharacterGender}
        value={ctx.state.gender}
      />
    </div>
  );
});

SearchCharactersFieldset.displayName = 'SearchCharactersFieldset';
