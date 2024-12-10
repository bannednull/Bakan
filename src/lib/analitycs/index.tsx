import { env } from '@/lib/env';
import { GoogleAnalytics } from './google';

type AnalyticsProviderProps = {
  readonly children: React.ReactNode;
};

export const AnalitycsProvider = ({ children }: AnalyticsProviderProps) => {
  return (
    <>
      {children}
      {env.NODE_ENV !== 'development' && env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </>
  );
};
