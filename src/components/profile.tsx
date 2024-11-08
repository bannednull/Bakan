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
import { Home, LogOut, User } from 'lucide-react';
import Link from 'next/link';

async function Profile() {
  const session = await auth();
  if (!session) return null;

  const getTwofirtsletters = (str: string) => {
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-accent/50 font-bold text-foreground hover:bg-accent"
          size="sm"
          variant="outline"
        >
          {getTwofirtsletters(session.user.email!)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]" align="end">
        <DropdownMenuLabel className="text-[10px]">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="flex w-full items-center gap-2" href="/dashboard">
            <Home /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="flex w-full items-center gap-2" href="/dashboard/profile">
            <User /> Profile
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
