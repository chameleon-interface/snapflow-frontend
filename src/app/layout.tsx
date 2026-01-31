import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'snapflow-ui-kit/styles.css';
import './global.css';
import { Header, Sidebar } from '@/widgets';
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
const isAuth = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        {isAuth && <Sidebar />}
        <main className={`${s.main} ${isAuth ? s.withSidebar : ''}`}>
          <div className={s.container}>{children}</div>
        </main>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
