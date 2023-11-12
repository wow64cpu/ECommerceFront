import clsx from 'clsx';
import { Suspense } from 'react';

import FilterList from './filter';
import { useLocale, useTranslations } from 'next-intl';
import { getCategories } from '../../../lib/strapi';

async function CollectionList({ title }: { title: string }) {
  const locale = useLocale();
  const categories = await getCategories(locale);

  return <FilterList list={categories} title={title} />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections() {
  const t = useTranslations('Categories');

  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList title={t('title')} />
    </Suspense>
  );
}
