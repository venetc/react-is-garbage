import { SearchLocationsContext } from '../model';

import { useContext } from 'react';

import { TextInputComponent } from '@/shared/ui/TextInputComponent';

export function SearchLocationsFieldset() {
  const [state, dispatch] = useContext(SearchLocationsContext);

  return (
    <div className="px-3 pb-4 pt-4 space-y-4">
      <TextInputComponent
        label="Name"
        placeholder="Earth"
        onChange={e => dispatch({ type: 'set-name', value: e.target.value })}
        value={state.name}
      />
      <TextInputComponent
        label="Type"
        placeholder="Planet"
        onChange={e => dispatch({ type: 'set-type', value: e.target.value })}
        value={state.type}
      />
      <TextInputComponent
        label="Dimension"
        placeholder="unknown"
        onChange={e => dispatch({ type: 'set-dimension', value: e.target.value })}
        value={state.dimension}
      />
    </div>
  );
}
