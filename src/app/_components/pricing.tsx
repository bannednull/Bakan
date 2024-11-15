'use client';

import { ArrowRight, Check } from 'lucide-react';
import pricing from '../../../pricing.json';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { cn, formatAmount } from '@/lib/utils';
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
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="my-4 text-balance text-5xl font-bold">Join our premium community</h3>
          <p className="text-balance text-muted-foreground">
            Subscribe to access exclusive blog content, get a personal dashboard where you can
            create your own articles and use a virtual assistant that will help you generate quality
            content.
          </p>

          <div className="flex items-center gap-2 py-4 text-lg">
            <strong className={isMonthly ? 'text-primary' : 'text-muted-foreground'}>
              Monthly
            </strong>
            <Switch checked={!isMonthly} onCheckedChange={handleSwitchChange} />
            <strong className={!isMonthly ? 'text-primary' : 'text-muted-foreground'}>
              Annually
            </strong>
          </div>
        </div>
        {pricing.map((item, index) => {
          const currentPrice = isMonthly ? item.price.monthly.value : item.price.yearly.value;
          const currentPriceId = isMonthly ? item.price.monthly.id : item.price.yearly.id;
          return (
            <div
              key={index}
              className={cn(
                'relative flex flex-1 flex-col overflow-hidden rounded-lg border bg-accent/30 p-6',
                item.highlight && 'border-blue-300 dark:border-sky-800',
              )}
            >
              <div className="absolute -bottom-10 -right-14 -z-10 h-[200px] w-[320px] bg-[linear-gradient(180deg,transparent_0,transparent),radial-gradient(circle_at_60%_60%,rgba(46,134,193,.2)_0,transparent_60%)]" />
              {item.highlight && (
                <span className="-ml-4 -mt-9 mb-4 inline w-[80px] rounded-lg bg-sky-800 px-2 py-1 text-center text-xs text-black">
                  Popular
                </span>
              )}
              <div className="space-y-1 text-center">
                <h4 className="text-xl font-bold">{item.name}</h4>
                <span className="text-muted-foreground">{item.description}</span>
              </div>

              <h5 className="mt-4 text-center text-4xl font-bold">
                {formatAmount(String(currentPrice))}
                <span className="text-sm text-muted-foreground">
                  {isMonthly ? '/month' : '/year'}
                </span>
              </h5>

              <Button className="my-4" onClick={() => handleCheckout(currentPriceId)}>
                Get Started <ArrowRight />
              </Button>

              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check
                      className={cn(
                        'size-4',
                        item.highlight ? 'text-green-700' : 'text-muted-foreground',
                      )}
                    />
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
