import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import Link from 'next/link';

type Props = {
  isSidebar?: boolean;
};

async function Profile({ isSidebar = false }: Props) {
  const session = await auth();
  if (!session) return null;

  const getTwofirtsletters = (str: string) => {
    return str.slice(0, 2).toUpperCase();
  };

  const email = getTwofirtsletters(session.user.email!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!isSidebar ? (
          <Button
            className="font-bold text-foreground hover:bg-accent data-[state=open]:bg-accent"
            size="sm"
            variant="outline"
          >
            {email}
          </Button>
        ) : (
          <Button
            className="flex w-full items-center justify-start gap-2 truncate p-0 text-sm text-muted-foreground hover:bg-transparent data-[state=open]:text-foreground"
            variant="ghost"
          >
            <small className="rounded-md bg-accent p-1.5 text-foreground">{email}</small>{' '}
            {session.user.email}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]" align="end">
        {!isSidebar && (
          <>
            <DropdownMenuLabel className="text-[10px]">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>
          <Link className="flex w-full items-center gap-2" href="/dashboard">
            <Home /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form
            className="w-full"
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit" className="flex w-full items-center gap-2">
              <LogOut /> Log Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Profile;
