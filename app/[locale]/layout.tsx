import Navbar from 'components/layout/navbar';
import { Roboto } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';
import { locales } from '../../i18n.config';
import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

const { SITE_NAME, STRAPI_STORE_DOMAIN } = process.env;
const baseUrl = STRAPI_STORE_DOMAIN ? `https://${STRAPI_STORE_DOMAIN}` : `http://localhost:3000`;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export function generateStaticParams() {
  // `locales` is just an array of all of
  // our supported locales: `["en-US", "ar-EG"]`
  return locales.map((locale) => ({ locale }));
}

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic']
});

async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} className={roboto.className}>
      <NextIntlClientProvider locale={locale}>
        <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
          <Navbar />
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout;
