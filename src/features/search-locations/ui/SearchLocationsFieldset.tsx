import { SearchLocationsContext } from '../model';

import { memo, useContext } from 'react';

import type { ChangeEvent } from 'react';

import { TextInputComponent } from '@/shared/ui/TextInputComponent';

export const SearchLocationsFieldset = memo(() => {
  const ctx = useContext(SearchLocationsContext);

  if (!ctx) return null;

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => ctx.setLocationName(e.target.value);
  const onTypeChange = (e: ChangeEvent<HTMLInputElement>) => ctx.setLocationType(e.target.value);
  const onDimensionChange = (e: ChangeEvent<HTMLInputElement>) => ctx.setLocationDimension(e.target.value);

  return (
    <div className="px-3 pb-4 pt-4 space-y-4 max-sm:p-2">
      <TextInputComponent
        label="Name"
        placeholder="Earth"
        onChange={onNameChange}
        onClear={ctx.clearLocationName}
        value={ctx.state.name}
      />
      <TextInputComponent
        label="Type"
        placeholder="Planet"
        onChange={onTypeChange}
        onClear={ctx.clearLocationType}
        value={ctx.state.type}
      />
      <TextInputComponent
        label="Dimension"
        placeholder="Unknown"
        onChange={onDimensionChange}
        onClear={ctx.clearLocationDimension}
        value={ctx.state.dimension}
      />
    </div>
  );
});

SearchLocationsFieldset.displayName = 'SearchLocationsFieldset';
