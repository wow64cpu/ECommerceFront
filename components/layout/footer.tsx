import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { Suspense } from 'react';
import { getMenu } from '../../lib/strapi';
import LocaleSelector from '../locale-selector';
import { useLocale, useTranslations } from 'next-intl';

const { COMPANY_NAME, SITE_NAME } = process.env;

async function Footer() {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  // const menu = await getMenu('next-js-frontend-footer-menu');
  const menu = await getMenu('footer', locale);
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link className="flex items-center gap-2 text-black dark:text-white md:pt-1" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto">
          <LocaleSelector />
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <Copyright date={copyrightDate} name={copyrightName} />
        </div>
      </div>
    </footer>
  );
}

function Copyright({ date, name }: { date: string; name: string }) {
  const t = useTranslations('Footer');

  return (
    <>
      <p>
        &copy; {date} {name}
        {name.length && !name.endsWith('.') ? '.' : ''} {t('all_rights_reserved')}.
      </p>
      {/*<hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />*/}
      {/*<p>Designed in California</p>*/}
      {/*<p className="md:ml-auto">*/}
      {/*  <a href="https://vercel.com" className="text-black dark:text-white">*/}
      {/*    Crafted by ▲ Vercel*/}
      {/*  </a>*/}
      {/*</p>*/}
    </>
  );
}

export default Footer;
