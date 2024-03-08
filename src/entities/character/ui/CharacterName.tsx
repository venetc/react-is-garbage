import { Link } from '@tanstack/react-router';

import type { ComponentProps } from 'react';

interface CharacterNameProps extends ComponentProps<'div'> {
  name: string;
  characterId: string;
}

export function CharacterName(props: CharacterNameProps) {
  const { name, characterId, className, ...rest } = props;
  return (
    <div
      className={`text-navy-600 max-sm:text-center ${className ?? ''}`}
      {...rest}
    >
      <Link to="/characters/$id" params={{ id: characterId }} className="cursor-pointer group">
        <span className="align-middle leading-4">{name}</span>
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
          className="inline w-auto align-middle h-[1em] ml-1.5 group-hover:text-navy-500/75 text-transparent transition-colors max-sm:text-navy-500/75"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </Link>
    </div>
  );
}
