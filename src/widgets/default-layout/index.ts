import { DefaultLayout } from './ui';

import { createRoute } from '@tanstack/react-router';

import { rootRoute } from '@/shared/routing';

export const DefaultLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'default-layout',
  component: DefaultLayout,
});
