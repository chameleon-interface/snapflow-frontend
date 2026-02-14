import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/shared/config/i18n/request.ts',
});

export default withNextIntl(nextConfig);
