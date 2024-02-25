import { Outlet } from '@tanstack/react-router';

export function HeadlessLayout() {
  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
}
