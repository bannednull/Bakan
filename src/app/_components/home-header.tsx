import Profile from '@/components/profile';
import { ToggleTheme } from '@/components/toggle-theme';
import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const routes = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
];

async function HomeHeader() {
  const session = await auth();

  return (
    <header className="py-4">
      <nav className="mx-auto flex max-w-screen-lg items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Bakan</h1>

        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="gap-4">
            {routes.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className="text-muted-foreground hover:text-foreground">
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ToggleTheme />

          {!session ? (
            <>
              <Link href="/login">Sign In</Link>
              <Link
                className={cn(buttonVariants(), 'bg-blue-500 text-white hover:bg-blue-600')}
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
