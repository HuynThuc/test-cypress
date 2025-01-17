import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// eslint-disable-next-line import/order
import { unstable_setRequestLocale } from 'next-intl/server';

import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Rabito English',
  description:
    'Rabito English - Master English with engaging lessons and practical skills for real-life success.',
  icons: {
    icon: '/images/rabito-english.ico',
  },
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: Props) {
  const locale = params.locale || 'en';
  unstable_setRequestLocale(locale);

  return (
    <html id="html-focus" lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
