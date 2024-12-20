import Logo from '@/components/logo';
import Profile from '@/components/profile';
import { ToggleTheme } from '@/components/toggle-theme';
import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { getUser } from '@/lib/auth/session';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { use } from 'react';

const routes = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
  { title: 'Docs', href: '/docs' },
];

function HomeHeader() {
  const user = use(getUser());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav className="mx-auto flex max-w-screen-xl items-center justify-between gap-2 py-4">
        <Logo className="size-6" /> <h1 className="text-xl font-bold">Bakan</h1>
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="gap-8">
            {routes.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink>{item.title}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <ToggleTheme />

          {!user ? (
            <>
              <Link href="/login">Sign In</Link>
              <Link
                className={cn(
                  buttonVariants({ size: 'sm' }),
                  'bg-blue-500 text-white hover:bg-blue-600',
                )}
                href="/register"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Profile />
          )}
        </div>
      </nav>
    </header>
  );
}

export default HomeHeader;
