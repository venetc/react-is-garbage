import { RouterProvider, createRouter } from '@tanstack/react-router';

import { rootRoute } from '@/shared/routing';
import { HeadlessLayoutRoute } from '@/widgets/headless-layout';
import { mainPageRoute } from '@/pages/main';
import { charactersPageRoute } from '@/pages/characters';
import { locationsPageRoute } from '@/pages/locations';
import { episodesPageRoute } from '@/pages/episodes';

const routeTree = rootRoute.addChildren([
  HeadlessLayoutRoute.addChildren([
    mainPageRoute,
    charactersPageRoute,
    locationsPageRoute,
    episodesPageRoute,
  ]),
]);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({ routeTree });

export const AppWithRouter = () => (<RouterProvider router={router} />);
