import { Link } from '@tanstack/react-router';

import type { HTMLAttributes } from 'react';

interface CharacterLocationLinkProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  name: string;
  locationUrl: string;
}

export function CharacterLocationLink(props: CharacterLocationLinkProps) {
  const { label, name, locationUrl, className, ...rest } = props;

  const locationId = getLocationId(locationUrl);

  return (
    <div className={`relative flex gap-1 ${className ?? ''}`} {...rest}>
      <span className="font-fira_code font-bold">
        {label}
      </span>
      {locationId
        ? (
          <Link to="/locations/$locationId" params={{ locationId }} className="cursor-pointer group">
            <span className="capitalize align-middle text-navy-500">{name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline w-auto align-middle h-[1em] ml-1 group-hover:text-navy-500/75 text-transparent transition-colors"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </Link>
          )
        : <span className="capitalize align-baseline text-navy-900">{name}</span>}
    </div>
  );
}

function getLocationId(locationUrl: string) {
  const locationId = locationUrl.split('/').pop();

  if (!locationId || Number.isNaN(+locationId)) return;

  return locationId;
}
