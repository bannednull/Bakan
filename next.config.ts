import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', 'recharts'],
  },
};

const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

export default config;
