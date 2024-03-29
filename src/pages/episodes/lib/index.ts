import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { HeadlessLayoutRoute } from '@/widgets/headless-layout';

export const episodesPageRoute = createRoute({
  getParentRoute: () => HeadlessLayoutRoute,
  path: '/episodes/$id',
  component: lazyRouteComponent(() => import('../ui/page')),
});
