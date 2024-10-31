import { ToggleTheme } from '@/components/toggle-theme';
import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function HomeHeader() {
  return (
    <header className="py-4">
      <nav className="mx-auto flex max-w-screen-lg items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Bakan</h1>

        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="text-muted-foreground hover:text-foreground">
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ToggleTheme />

        <Link href="/login">Sign In</Link>
        <Link
          className={cn(buttonVariants(), 'bg-blue-500 text-white hover:bg-blue-600')}
          href="/register"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

export default HomeHeader;
