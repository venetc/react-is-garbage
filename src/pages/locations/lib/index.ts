import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { HeadlessLayoutRoute } from '@/widgets/headless-layout';

export const locationsPageRoute = createRoute({
  getParentRoute: () => HeadlessLayoutRoute,
  path: '/locations/$locationId',
  component: lazyRouteComponent(() => import('../ui/page')),
});
