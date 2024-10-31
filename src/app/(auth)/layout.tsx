import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';
import Link from 'next/link';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'absolute left-6 top-6 select-none rounded-full',
        )}
        href="/"
      >
        <Home /> Home
      </Link>
      <div className="flex h-screen flex-col items-center justify-center">
        <section className="mx-auto my-5 w-full max-w-xs">{children}</section>
      </div>
    </>
  );
}

export default AuthLayout;
