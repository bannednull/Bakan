import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    optimizePackageImports: ['lucide-react', 'date-fns', 'recharts'],
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'],
    },
  },
};

const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

export default config;
