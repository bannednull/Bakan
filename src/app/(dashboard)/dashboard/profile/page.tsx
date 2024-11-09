import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Header from '@dashboard/_components/header';
import ChangePassword from '@dashboard/profile/_components/change-password';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import pricing from '@/../pricing.json';
import Heading from '@dashboard/_components/heading';
import { formatAmount } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

function calculateRemainingTime(expirationDateString: Date) {
  const expirationDate = dayjs(expirationDateString);

  const currentDate = dayjs();

  const hasNotExpired = currentDate.isBefore(expirationDate);

  if (!hasNotExpired) {
    return 'The date has already expired.';
  } else {
    const remainingDays = expirationDate.diff(currentDate, 'days');
    const remainingHours = expirationDate.diff(currentDate, 'hours') % 24;
    return `There are ${remainingDays} days and ${remainingHours} hours left until the expiration date.`;
  }
}

function getPlanById(priceId: string) {
  for (const plan of pricing) {
    if (plan.price.monthly.id === priceId || plan.price.yearly.id === priceId) {
      return { price: plan.price, name: plan.name };
    }
  }
  return null;
}

export const metadata: Metadata = {
  title: 'Profile',
};

async function ProfilePage() {
  const session = await auth();
  if (!session) return notFound();

  const infoUser = await prisma.user.findUnique({
    where: {
      id: +session.user.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      customerId: true,
      Subscription: {
        where: {
          status: 'active',
        },
      },
    },
  });

  if (!infoUser) return notFound();

  return (
    <div className="flex h-screen flex-col">
      <Header title="Profile" />

      <ScrollArea className="flex-1">
        <div className="flex h-full flex-col">
          <Tabs defaultValue="account" orientation="vertical" className="flex h-full">
            <TabsList className="flex h-full w-[230px] flex-col justify-start gap-1 rounded-none border-r bg-transparent p-4">
              <TabsTrigger
                value="account"
                className="w-full justify-start data-[state=active]:bg-accent"
              >
                Account
              </TabsTrigger>

              <TabsTrigger
                value="billing"
                className="w-full justify-start data-[state=active]:bg-accent"
              >
                Billing
              </TabsTrigger>

              <TabsTrigger
                value="password"
                className="w-full justify-start data-[state=active]:bg-accent"
              >
                Change password
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 px-6 py-2">
              <TabsContent value="account" className="h-full">
                <Heading title="Account" description="Your account details" />
              </TabsContent>

              <TabsContent value="billing" className="h-full">
                <Heading title="Billing" description="Your current subscription details" />

                <div className="mt-4 border-b py-2">
                  {infoUser.Subscription.map((item) => {
                    const period = item.period === 'month' ? 'monthly' : 'yearly';
                    const plan = getPlanById(item.plan!);
                    if (!plan) return null;
                    return (
                      <div key={item.id} className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{plan.name}</h3>
                          <p className="font-bold text-muted-foreground">
                            {formatAmount(String(plan.price[period].value))} / {period}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {calculateRemainingTime(item.endDate)}
                          </span>
                        </div>
                        <Button size="sm" variant="outline">
                          Cancel subscription
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="password" className="h-full">
                <Heading title="Change password" description="Update your password" />
                <ChangePassword />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}

export default ProfilePage;
