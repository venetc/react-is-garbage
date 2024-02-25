import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { HeadlessLayoutRoute } from '@/widgets/headless-layout';

export const mainPageRoute = createRoute({
  getParentRoute: () => HeadlessLayoutRoute,
  path: '/',
  component: lazyRouteComponent(() => import('./ui/page')),
});
