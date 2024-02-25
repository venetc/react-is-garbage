import { useLayoutEffect, useRef, useState } from 'react';

export function useImage(url: string) {
  const statusRef = useRef<'loading' | 'success' | 'failed'>('loading');

  const [, triggerRerender] = useState(0);

  const loadedUrl = useRef<string | null>(null);

  if (loadedUrl.current !== url) {
    statusRef.current = 'loading';
    loadedUrl.current = url;
  }

  const onload = () => {
    statusRef.current = 'success';
    triggerRerender(Math.random());
  };

  const onerror = () => {
    statusRef.current = 'failed';
    triggerRerender(Math.random());
  };

  useLayoutEffect(() => {
    if (!url) return;
    const img = document.createElement('img');

    img.addEventListener('load', onload);
    img.addEventListener('error', onerror);

    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.src = url;

    return () => {
      img.removeEventListener('load', onload);
      img.removeEventListener('error', onerror);
    };
  }, [url]);

  return { url: loadedUrl.current, status: statusRef.current };
}
