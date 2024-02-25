import type { HTMLAttributes } from 'react';
import type { Character } from '../model';

import { useImage } from '@/shared/lib/useImage';

interface CharacterImageProps extends HTMLAttributes<HTMLDivElement> { image: Character['image']; name: Character['name'] }

export function CharacterImage(props: CharacterImageProps) {
  const { image, name, className, ...rest } = props;

  const { url, status } = useImage(image);

  return (
    <div className={`relative ${className ?? ''}`} {...rest}>
      { status === 'loading' && (
        <div className="w-full h-full rounded-md bg-navy-100 animate-pulse" />
      ) }
      { status === 'success' && (
        <img
          src={url}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          width={80}
          height={80}
          alt={name}
          className="rounded-md h-full w-full object-cover"
        />
      ) }
    </div>
  );
}
