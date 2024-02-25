import { useEffect, useState } from 'react';

import type { MutableRefObject } from 'react';

export function useOnScreen(ref: MutableRefObject<HTMLDivElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting), { root: null, rootMargin: '0px', threshold: 1.0 });
    if (ref.current) {
      observer.observe(ref.current);
    }
  });

  return isIntersecting;
}
