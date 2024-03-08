import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { HeadlessLayoutRoute } from '@/widgets/headless-layout';

export const charactersPageRoute = createRoute({
  getParentRoute: () => HeadlessLayoutRoute,
  path: '/characters/$id',
  component: lazyRouteComponent(() => import('../ui/page')),
});
