export function getLinkId(locationUrl: string) {
  const slashIndex = locationUrl.lastIndexOf('/');

  if (slashIndex < 0) return;

  const maybeId = locationUrl.slice(slashIndex + 1);

  if (Number.isNaN(+maybeId)) return;

  return maybeId;
}
