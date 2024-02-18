'use client';

import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';

const LocaleSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();

  const handleSwitchLocale = (locale: string) => () => {
    router.push(pathName, { locale });
  };

  return (
    <div className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-gray-500">
      <button
        className={clsx('px-3', {
          'text-white': locale === 'ru'
        })}
        onClick={handleSwitchLocale('ru')}
      >
        ru
      </button>
      <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
      <button
        className={clsx('px-3', {
          'text-white': locale === 'en'
        })}
        onClick={handleSwitchLocale('en')}
      >
        en
      </button>
    </div>
  );
};

export default LocaleSelector;
