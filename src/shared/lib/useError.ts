import sound from '../assets/audio.mp3';

import { useEffect } from 'react';

export const audio = new Audio(sound);

export function useError(isError: boolean) {
  useEffect(() => {
    if (isError) {
      audio.play();
    }
  }, [isError]);
}
