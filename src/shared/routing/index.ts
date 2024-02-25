import { RootComponent } from './rootComponent';

import { createRootRoute } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: RootComponent,
});
