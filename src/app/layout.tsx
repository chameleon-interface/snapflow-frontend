import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'snapflow-ui-kit/styles.css';
import './global.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Header } from '@/widgets/Header';
import { Sidebar } from '@/widgets/Sidebar';
import { QueryProgressBar } from '@/shared/ui';
import s from './layout.module.css';
import Providers from '@/app/providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Snapflow',
  icons: {
    icon: [
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            <QueryProgressBar />
            <Sidebar />
            <main className={s.main}>
              <div className={s.container}>{children}</div>
            </main>
            <div id="modal-root"></div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
