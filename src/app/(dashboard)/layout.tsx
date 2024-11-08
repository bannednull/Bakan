import ActivateLink from '@/components/activate-link';
import Logo from '@/components/logo';
import { Home, NotebookPen } from 'lucide-react';

const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    Icon: <Home className="size-5" strokeWidth={1.2} />,
  },
  {
    title: 'Blog',
    path: '/dashboard/blog',
    Icon: <NotebookPen className="size-5" strokeWidth={1.2} />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-[225px_1fr]">
      <aside className="flex flex-col gap-4 border-r p-4">
        <div className="mb-3 flex items-center gap-2">
          <Logo className="size-5" />
          <h1 className="text-xl font-bold">Bakan</h1>
        </div>

        <nav>
          <ul className="-mx-1.5 flex flex-col gap-1 text-sm">
            {routes.map(({ title, path, Icon }, index) => (
              <li key={index} className="rounded-lg hover:bg-accent/50">
                <ActivateLink
                  className="flex items-center gap-2 p-1.5 text-muted-foreground"
                  path={path}
                >
                  {Icon} {title}
                </ActivateLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section className="overflow-hidden">{children}</section>
    </main>
  );
}

export default DashboardLayout;
