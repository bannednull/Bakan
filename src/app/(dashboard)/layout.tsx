import ActivateLink from '@/components/activate-link';
import { Home, NotebookPen } from 'lucide-react';

const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    Icon: <Home className="size-4" strokeWidth={1.5} />,
  },
  {
    title: 'Blog',
    path: '/dashboard/blog',
    Icon: <NotebookPen className="size-4" strokeWidth={1.5} />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-cols-[270px_1fr]">
      <aside className="flex flex-col gap-4 border-r bg-muted p-5">
        <h1 className="mb-2 text-xl font-bold">Bakan</h1>

        <nav>
          <ul className="flex flex-col gap-1 text-sm">
            <li className="pl-2 text-[10px] font-semibold text-muted-foreground">
              <small>GENERAL</small>
            </li>
            {routes.map(({ title, path, Icon }, index) => (
              <li key={index} className="rounded-lg hover:bg-accent/50">
                <ActivateLink className="flex items-center gap-2 p-2" path={path}>
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
