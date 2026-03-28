import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/shared/config/i18n/request.ts',
});

const nextConfig: NextConfig = {
  serverExternalPackages: ['@countrystatecity/countries'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'snapflow-storage.storage.yandexcloud.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
