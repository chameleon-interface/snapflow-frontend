import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/shared/config/i18n/request.ts',
});

export default withNextIntl(nextConfig);

// import type { NextConfig } from 'next';
// import createNextIntlPlugin from 'next-intl/plugin';
//
// const nextConfig: NextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://snapflow.cc/api/v1/:path*',
//       },
//     ];
//   },
// };
//
// const withNextIntl = createNextIntlPlugin({
//   requestConfig: './src/shared/config/i18n/request.ts',
// });
//
// export default withNextIntl(nextConfig);
