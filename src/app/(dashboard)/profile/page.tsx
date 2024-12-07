import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Header from '@dashboard/_components/header';
import ChangePassword from '@dashboard/profile/_components/change-password';
import { notFound } from 'next/navigation';
import pricing from '@/../pricing.json';
import Heading from '@dashboard/_components/heading';
import { formatAmount } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { differenceInDays, differenceInHours, isBefore, parseISO } from 'date-fns';
import { CreditCard } from 'lucide-react';
import UploadAvatar from '@dashboard/profile/_components/upload-avatar';
import ChangeName from '@dashboard/profile/_components/change-name';

function calculateRemainingTime(expirationDateString: Date | string) {
  const expirationDate =
    typeof expirationDateString === 'string'
      ? parseISO(expirationDateString)
      : expirationDateString;

  const currentDate = new Date();

  const hasNotExpired = isBefore(currentDate, expirationDate);

  if (!hasNotExpired) {
    return 'The date has already expired.';
  } else {
    const remainingDays = differenceInDays(expirationDate, currentDate);
    const remainingHours = differenceInHours(expirationDate, currentDate) % 24;
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
    <div className="flex flex-col">
      <Header title="Profile" />

      <ScrollArea className="p-6">
        <Tabs defaultValue="account">
          <TabsList className="items-start justify-start gap-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="password">Change password</TabsTrigger>
          </TabsList>

          <div className="px-1">
            <TabsContent value="account">
              <Heading title="Account" description="Your account details" />

              <div className="mt-4 space-y-2">
                <UploadAvatar image={infoUser.image} />
                <ChangeName />
              </div>
            </TabsContent>

            <TabsContent value="billing">
              <Heading title="Billing" description="Your current subscription details" />

              {infoUser.Subscription.length === 0 ? (
                <div className="mx-auto flex w-[320px] flex-col items-center gap-1 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-base font-semibold tracking-tight">No billing information</p>
                  <p className="text-pretty text-sm text-muted-foreground">
                    You haven&apos;t set up any billing information yet. Add a payment method to
                    start your subscription.
                  </p>
                </div>
              ) : (
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
              )}
            </TabsContent>

            <TabsContent value="password">
              <Heading title="Change password" description="Update your password" />
              <div className="mt-4">
                <ChangePassword />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </ScrollArea>
    </div>
  );
}

export default ProfilePage;
