import { type Location, LocationRow } from '@/entities/location';

interface LocationsListProps extends React.HTMLAttributes<HTMLUListElement> {
  locations: Location[];
  onTypeClick: (value: string) => void;
  onDimensionClick: (value: string) => void;
}
export function LocationsList(props: LocationsListProps) {
  const { locations, className, onTypeClick, onDimensionClick, ...rest } = props;

  return (
    <ul className={`space-y-3 ${className ?? ''}`} {...rest}>
      {locations.map(location => (
        <LocationRow
          key={location.id}
          location={location}
          onTypeClick={onTypeClick}
          onDimensionClick={onDimensionClick}
        />
      ))}
    </ul>
  );
}
