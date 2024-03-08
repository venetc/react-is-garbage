import type { ComponentProps } from 'react';
import type { Character } from '../model';

import { useImage } from '@/shared/lib/useImage';

interface CharacterImageProps extends ComponentProps<'div'> {
  image: Character['image'];
  name: Character['name'];
  width?: number;
  height?: number;
}

export function CharacterImage(props: CharacterImageProps) {
  const { image, name, className, width = 80, height = 80, ...rest } = props;

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
          width={width}
          height={height}
          alt={name}
          className="rounded-md h-full w-full object-cover"
        />
      ) }
    </div>
  );
}
