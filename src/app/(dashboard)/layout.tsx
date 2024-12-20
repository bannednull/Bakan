import ActivateLink from '@/components/activate-link';
import Logo from '@/components/logo';
import Profile from '@/components/profile';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Home, NotebookPen, Sparkles, User, Users2 } from 'lucide-react';
import { use } from 'react';

const routes = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    admin: false,
    Icon: <Home className="size-5" strokeWidth={1.2} />,
  },
  {
    title: 'Profile',
    path: '/profile',
    admin: false,
    Icon: <User className="size-5" strokeWidth={1.2} />,
  },
  {
    title: 'Customers',
    path: '/customer',
    admin: true,
    Icon: <Users2 className="size-5" strokeWidth={1.2} />,
  },
  {
    separator: true,
    title: 'Blog',
    path: '/blogs',
    admin: false,
    Icon: <NotebookPen className="size-5" strokeWidth={1.2} />,
  },
  {
    title: 'Chat',
    path: '/chat',
    admin: false,
    Icon: <Sparkles className="size-5" strokeWidth={1.2} />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = use(auth());

  return (
    <main className="grid h-screen grid-cols-[235px_1fr]">
      <aside className="flex flex-col gap-4 border-r px-5 py-4">
        <div className="mb-3 flex items-center gap-2">
          <Logo className="size-5" />
          <h1 className="text-xl font-bold">Bakan</h1>
        </div>

        <nav className="flex h-full flex-grow flex-col justify-between">
          <ul className="-mx-1 flex flex-col gap-1.5 text-sm">
            {routes.map(({ title, path, admin, Icon, separator }, index) => {
              if (admin && session?.user.role !== 'admin') {
                return null;
              }
              return (
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
              );
            })}
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
