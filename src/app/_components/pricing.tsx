'use client';

import { Check } from 'lucide-react';
import pricing from '../../../pricing.json';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { formatAmount } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getStripe } from '@/lib/stripe/client';
import { checkoutWithStripe } from '@/lib/stripe/server';

function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true);

  const { data: session } = useSession();
  const router = useRouter();

  const handleSwitchChange = () => {
    setIsMonthly(!isMonthly);
  };

  const handleCheckout = async (priceId: string) => {
    if (!session) router.push('/register');

    const { sessionId } = await checkoutWithStripe(priceId);

    if (!sessionId) {
      return null;
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2 py-4 text-lg">
        <strong className={isMonthly ? 'text-primary' : 'text-muted-foreground'}>Monthly</strong>
        <Switch checked={!isMonthly} onCheckedChange={handleSwitchChange} />
        <strong className={!isMonthly ? 'text-primary' : 'text-muted-foreground'}>Annually</strong>
      </div>

      <div className="flex items-start justify-start gap-4">
        {pricing.map((item, index) => {
          const currentPrice = isMonthly ? item.price.monthly.value : item.price.yearly.value;
          const currentPriceId = isMonthly ? item.price.monthly.id : item.price.yearly.id;
          return (
            <div key={index} className="flex flex-1 flex-col rounded-lg border bg-accent/30 p-4">
              <div className="space-y-1 text-center">
                <h4 className="text-xl font-bold">{item.name}</h4>
                <span className="text-muted-foreground">{item.description}</span>
              </div>

              <h5 className="mt-4 text-center text-3xl font-bold">
                {formatAmount(String(currentPrice))}
              </h5>

              <Button
                className="my-4"
                variant="secondary"
                onClick={() => handleCheckout(currentPriceId)}
              >
                Get Started
              </Button>

              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-4" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Pricing;
