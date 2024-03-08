import { getLinkId } from './getLinkId';

import { describe, expect, it } from 'vitest';

describe('function to retrieve id from url', () => {
  it('should return id from url', () => {
    expect(getLinkId('https://rickandmortyapi.com/api/character/1')).toBe('1');
  });

  it('should return undefined when there is no id in url', () => {
    expect(getLinkId('https://rickandmortyapi.com/api/character')).toBeUndefined();
  });
});
