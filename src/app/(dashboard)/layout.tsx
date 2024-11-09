import ActivateLink from '@/components/activate-link';
import Logo from '@/components/logo';
import Profile from '@/components/profile';
import { cn } from '@/lib/utils';
import { Home, NotebookPen, Sparkles, User, Users2 } from 'lucide-react';

const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    Icon: <Home className="size-5" strokeWidth={1.2} />,
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    Icon: <User className="size-5" strokeWidth={1.2} />,
  },
  {
    title: 'Customers',
    path: '/dashboard/customer',
    Icon: <Users2 className="size-5" strokeWidth={1.2} />,
  },
  {
    separator: true,
    title: 'Blog',
    path: '/dashboard/blog',
    Icon: <NotebookPen className="size-5" strokeWidth={1.2} />,
  },
  {
    title: 'Chat',
    path: '/dashboard/chat',
    Icon: <Sparkles className="size-5" strokeWidth={1.2} />,
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

        <nav className="flex h-full flex-grow flex-col justify-between">
          <ul className="flex flex-col gap-1.5 text-sm">
            {routes.map(({ title, path, Icon, separator }, index) => (
              <li key={index} className={cn(separator && 'mt-1 border-t pt-2')}>
                <ActivateLink
                  className={cn(
                    'flex items-center gap-2 rounded-lg p-1.5 text-muted-foreground hover:bg-accent/50',
                  )}
                  path={path}
                >
                  {Icon} {title}
                </ActivateLink>
              </li>
            ))}
          </ul>

          <ul className="mt-auto">
            <Profile isSidebar />
          </ul>
        </nav>
      </aside>

      <section className="overflow-hidden">{children}</section>
    </main>
  );
}

export default DashboardLayout;
