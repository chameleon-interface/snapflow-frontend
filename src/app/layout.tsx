import { Header, Sidebar } from '@/widgets';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import 'snapflow-ui-kit/styles.css';
import './global.css';
import s from './layout.module.css';

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
const isAuth = false;

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
          <Header />
          {isAuth && <Sidebar />}
          <main className={`${s.main} ${isAuth ? s.withSidebar : ''}`}>
            <div className={s.container}>{children}</div>
          </main>
          <div id="modal-root"></div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
