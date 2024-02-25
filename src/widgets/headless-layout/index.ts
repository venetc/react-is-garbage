import { HeadlessLayout } from './ui';

import { createRoute } from '@tanstack/react-router';

import { rootRoute } from '@/shared/routing';

export const HeadlessLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'headless-layout',
  component: HeadlessLayout,
});
