import { SearchCharactersContext } from '../model';

import { useContext } from 'react';

import { TextInputComponent } from '@/shared/ui/TextInputComponent';
import { DropdownComponent } from '@/shared/ui/DropdownComponents';

export function SearchCharactersFieldset() {
  const [state, dispatch] = useContext(SearchCharactersContext);

  return (
    <div className="px-3 pb-4 pt-4 space-y-4">
      <TextInputComponent
        label="Name"
        placeholder="Rick"
        onChange={e => dispatch({ type: 'set-name', value: e.target.value })}
        onClear={() => dispatch({ type: 'set-name', value: '' })}
        value={state.name}
      />
      <TextInputComponent
        label="Species"
        placeholder="Human"
        onChange={e => dispatch({ type: 'set-species', value: e.target.value })}
        onClear={() => dispatch({ type: 'set-species', value: '' })}
        value={state.species}
      />
      <TextInputComponent
        label="Type"
        placeholder="Clone"
        onChange={e => dispatch({ type: 'set-type', value: e.target.value })}
        onClear={() => dispatch({ type: 'set-type', value: '' })}
        value={state.type}
      />
      <DropdownComponent
        label="Status"
        options={['Alive', 'Dead', 'Unknown']}
        onChange={e => dispatch({ type: 'set-status', value: e.target.value })}
        onClear={() => dispatch({ type: 'set-status', value: '' })}
        value={state.status}
      />
      <DropdownComponent
        label="Gender"
        options={['Female', 'Male', 'Genderless', 'Unknown']}
        onChange={e => dispatch({ type: 'set-gender', value: e.target.value })}
        onClear={() => dispatch({ type: 'set-gender', value: '' })}
        value={state.gender}
      />
    </div>
  );
}
