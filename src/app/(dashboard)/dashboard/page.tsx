import Header from '@dashboard/_components/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import Heading from '@dashboard/_components/heading';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { CreditCard, Users2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

async function DashboardPage() {
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

        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="rounded-lg border bg-accent/40 p-4">
            <div className="flex items-center gap-2 text-sm">
              <CreditCard color="#3b82f6" className="size-8 rounded-full bg-background p-1.5" />{' '}
              <span>Total Subscriptions</span>
            </div>
            {subscriptionCount}
          </div>

          <div className="rounded-lg border bg-accent/40 p-4">
            <div className="flex items-center gap-2 text-sm">
              <Users2 color="#3b82f6" className="size-8 rounded-full bg-background p-1.5" />{' '}
              <span>Total Users</span>
            </div>
            {usersCount}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default DashboardPage;
