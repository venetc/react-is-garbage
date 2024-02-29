import { memo } from 'react';

import type { CharactersQueryAdapter } from '../model';
import type { ChangeEvent } from 'react';

import { TextInputComponent } from '@/shared/ui/TextInputComponent';
import { DropdownComponent } from '@/shared/ui/DropdownComponents';

export const SearchCharactersFieldset = memo(({
  state,
  clearCharacterGender,
  clearCharacterName,
  clearCharacterSpecies,
  clearCharacterStatus,
  clearCharacterType,
  setCharacterGender,
  setCharacterName,
  setCharacterSpecies,
  setCharacterStatus,
  setCharacterType,
}: CharactersQueryAdapter) => {
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => setCharacterName(e.target.value);
  const onNameClear = () => clearCharacterName();

  const onSpeciesChange = (e: ChangeEvent<HTMLInputElement>) => setCharacterSpecies(e.target.value);
  const onSpeciesClear = () => clearCharacterSpecies();

  const onTypeChange = (e: ChangeEvent<HTMLInputElement>) => setCharacterType(e.target.value);
  const onTypeClear = () => clearCharacterType();

  const onStatusChange = (e: ChangeEvent<HTMLSelectElement>) => setCharacterStatus(e.target.value);
  const onStatusClear = () => clearCharacterStatus();

  const onGenderChange = (e: ChangeEvent<HTMLSelectElement>) => setCharacterGender(e.target.value);
  const onGenderClear = () => clearCharacterGender();

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
        label="Species"
        placeholder="Human"
        onChange={onSpeciesChange}
        onClear={onSpeciesClear}
        value={state.species}
      />
      <TextInputComponent
        label="Type"
        placeholder="Clone"
        onChange={onTypeChange}
        onClear={onTypeClear}
        value={state.type}
      />
      <DropdownComponent
        label="Status"
        options={['Alive', 'Dead', 'Unknown']}
        onChange={onStatusChange}
        onClear={onStatusClear}
        value={state.status}
      />
      <DropdownComponent
        label="Gender"
        options={['Female', 'Male', 'Genderless', 'Unknown']}
        onChange={onGenderChange}
        onClear={onGenderClear}
        value={state.gender}
      />
    </div>
  );
});

SearchCharactersFieldset.displayName = 'SearchCharactersFieldset';
