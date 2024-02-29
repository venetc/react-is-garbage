import { useEffect, useRef, useState } from 'react';

import type { Dispatch, SetStateAction } from 'react';

interface State {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
};

type ObserverCallback = (
  isIntersecting: boolean,
  entry: IntersectionObserverEntry,
) => void;
interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  onChange?: ObserverCallback;
  initialIsIntersecting?: boolean;
}

interface IntersectionResult {
  ref: Dispatch<SetStateAction<HTMLElement | null>>;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export function useObserver(options: IntersectionObserverOptions): IntersectionResult {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    initialIsIntersecting = false,
  } = options;

  const [ref, setRef] = useState<HTMLElement | null>(null);

  const [state, setState] = useState<State>(() => ({
    isIntersecting: initialIsIntersecting,
    entry: undefined,
  }));

  const callbackRef = useRef<ObserverCallback>();

  callbackRef.current = options?.onChange;

  const frozen = state.entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    if (!ref) return;
    if (frozen) return;

    let unobserve: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const thresholds = Array.isArray(observer.thresholds)
          ? observer.thresholds
          : [observer.thresholds];

        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting && thresholds.some(threshold => entry.intersectionRatio >= threshold);

          setState({ isIntersecting, entry });

          if (callbackRef.current) callbackRef.current(isIntersecting, entry);

          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve();
            unobserve = undefined;
          }
        });
      },
      { threshold, root, rootMargin },
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [
    ref,
    JSON.stringify(threshold),
    root,
    rootMargin,
    frozen,
    freezeOnceVisible,
  ]);

  const prevRef = useRef<Element | null>(null);

  useEffect(() => {
    if (
      !ref
      && state.entry?.target
      && !freezeOnceVisible
      && !frozen
      && prevRef.current !== state.entry.target
    ) {
      prevRef.current = state.entry.target;
      setState({ isIntersecting: initialIsIntersecting, entry: undefined });
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting]);

  return { ref: setRef, isIntersecting: !!state.isIntersecting, entry: state.entry };
}
