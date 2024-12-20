import { Header, Heading } from '@dashboard/_components';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { Book, CreditCard, Play, Users2 } from 'lucide-react';
import Github from '@/components/brands/github';
import Discord from '@/components/brands/discord';
import X from '@/components/brands/x';
import { getUser } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'Dashboard',
};

async function DashboardPage() {
  const user = await getUser();

  const [subscriptionCount, usersCount] = await prisma.$transaction([
    prisma.subscription.count({
      where: {
        status: 'active',
      },
    }),
    prisma.user.count(),
  ]);

  return (
    <ScrollArea className="h-full">
      <Header />

      <div className="px-6 py-4">
        <Heading title="Dashboard" description="Welcome to your dashboard" />

        {user?.role === 'admin' && (
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="flex items-center rounded-lg border px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm">
                <CreditCard color="#3b82f6" className="size-5" /> <span>Total Subscriptions</span>
              </div>
              <p className="ml-auto font-bold text-blue-500">({subscriptionCount})</p>
            </div>

            <div className="flex items-center rounded-lg border px-4 py-2.5">
              <div className="flex items-center gap-2 text-sm">
                <Users2 color="#3b82f6" className="size-5" /> <span>Total Users</span>
              </div>
              <p className="ml-auto font-bold text-blue-500">({usersCount})</p>
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3 rounded-md border bg-accent/40 p-4">
              <div className="rounded-md bg-sky-700 p-2">
                <Book size={16} color="white" />
              </div>
              <p className="text-xs text-muted-foreground">
                <strong className="block text-sm text-foreground">Read the documentation</strong>
                Discover how you can make the most of it.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-md border bg-accent/40 p-4">
              <div className="rounded-md bg-emerald-700 p-2">
                <Play size={16} color="white" />
              </div>
              <p className="text-xs text-muted-foreground">
                <strong className="block text-sm text-foreground">Tutorial</strong>
                Discover the concepts, reference, guides and tutorials.
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-md border bg-accent/40 p-4">
              <strong>Join the community</strong>
              <p className="text-xs text-muted-foreground">
                Discuss with team members, contributors and developers.
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href="#" className="flex items-center gap-2">
                  <X /> X
                </a>
                <a href="#" className="flex items-center gap-2">
                  <Github className="size-5" /> Github
                </a>
                <a href="#" className="flex items-center gap-2">
                  <Discord className="size-5" /> Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default DashboardPage;
