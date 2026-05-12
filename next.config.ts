import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/shared/config/i18n/request.ts',
});

const nextConfig: NextConfig = {
  serverExternalPackages: ['@countrystatecity/countries'],

  outputFileTracingIncludes: {
    '/api/locations': ['./node_modules/@countrystatecity/countries/dist/**/*'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'snapflow-storage.storage.yandexcloud.net',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
