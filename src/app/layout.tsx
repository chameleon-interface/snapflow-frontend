import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'snapflow-ui-kit/styles.css';
import './global.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Header } from '@/widgets';
import s from './layout.module.css';
import Providers from '@/app/providers';
import { SidebarGuard } from '@/widgets/SidebarGuard/SidebarGuard';
import { BottomNav } from '@/widgets/BottomNav';

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

// TODO: заменить на реальную проверку авторизации

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
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <SidebarGuard />
            <main className={s.main}>
              <div className={s.container}>{children}</div>
            </main>
            <BottomNav />
            <div id="modal-root"></div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
