import { Link, Outlet } from '@tanstack/react-router';

const links = [
  ['/characters', 'Characters'],
  ['/locations', 'Locations'],
  ['/episodes', 'Episodes'],
] as const;

export function DefaultLayout() {
  return (
    <>
      <header className="sticky shadow shadow-navy-200 top-0 z-50 border-b rounded-b-lg border-border/40 mx-auto w-fit backdrop-blur bg-navy-200/95 supports-[backdrop-filter]:bg-navy-200/25">
        <nav className="flex py-1 px-6 gap-6">
          {links.map(([path, name]) => (
            <Link
              key={path}
              to={path}
              className="text-navy-600 text-lg transition-all opacity-75 hover:opacity-100"
              activeProps={{ className: 'opacity-100 font-semibold' }}
            >
              {name}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </>
  );
}
