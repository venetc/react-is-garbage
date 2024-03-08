import { LocationName } from './LocationName';

import { memo } from 'react';

import type { HTMLAttributes } from 'react';
import type { Location } from '../model';

import { EntityField } from '@/shared/ui/EntityField';

interface LocationRowProps extends HTMLAttributes<HTMLLIElement> {
  location: Location;
  onTypeClick: (type: Location['type']) => void;
  onDimensionClick: (dimension: Location['dimension']) => void;
}

export const LocationRow = memo((props: LocationRowProps) => {
  const { location, onTypeClick, onDimensionClick, ...rest } = props;

  return (
    <li
      className="
    font-nunito
    shadow-sm shadow-navy-100 border rounded-md border-navy-100 transition-[box-shadow,border-color]
    hover:shadow-md hover:border-navy-200 hover:shadow-navy-200
    group
    "
      {...rest}
    >
      <div className="
      flex gap-2 items-stretch
      max-sm:block
      "
      >
        <div className="
        flex flex-auto basis-10/12 items-center py-2 px-2 gap-x-2
        max-sm:flex-col max-sm:px-2 max-sm:gap-y-3
        "
        >
          <div className="basis-5/12">
            <LocationName
              name={location.name}
              locationId={location.id.toString()}
              className="
            font-bold
            max-sm:text-2xl
            "
            />
          </div>

          <div className="
          basis-7/12 grid grid-rows-2 grid-flow-col gap-x-6 gap-y-0.5 text-xs
          max-xl:text-sm max-xl:gap-x-2 max-xl:gap-y-1
          max-sm:w-full max-sm:grid-cols-1
          "
          >
            <EntityField
              label="Type:"
              field={location.type}
              onFieldClick={onTypeClick}
            />
            <EntityField
              label="Dimension:"
              field={location.dimension}
              onFieldClick={onDimensionClick}
            />
          </div>
        </div>
      </div>
    </li>
  );
});

LocationRow.displayName = 'LocationRow';
LocationRow.whyDidYouRender = false;
