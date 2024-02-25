import { Outlet } from '@tanstack/react-router';

export function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col font-fira_code">
      <Outlet />
    </div>
  );
}
