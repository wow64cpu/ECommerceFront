// import Footer from 'components/layout/footer';
import React, { Suspense } from 'react';
import Footer from '../../../components/layout/footer';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  return (
    <Suspense>
      <div className="w-full">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
