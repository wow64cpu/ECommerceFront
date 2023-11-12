'use client';

import clsx from 'clsx';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { PathFilterItem } from '.';
import { Category } from '../../../../lib/strapi/types';

function PathFilterItem({ item }: { item: Category }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const active = pathname === item.path;
  const active = pathname.split('/')[3] === item.handle;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? 'p' : Link;

  newParams.delete('q');

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.handle}>
      <DynamicTag
        // href={createUrl(item.path, newParams)}
        href={createUrl(`/search/${item.handle}`, newParams)}
        className={clsx(
          'w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {item.label}
      </DynamicTag>
    </li>
  );
}

// function SortFilterItem({ item }: { item: SortFilterItem }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const active = searchParams.get('sort') === item.slug;
//   const q = searchParams.get('q');
//   const href = createUrl(
//     pathname,
//     new URLSearchParams({
//       ...(q && { q }),
//       ...(item.slug && item.slug.length && { sort: item.slug })
//     })
//   );
//   const DynamicTag = active ? 'p' : Link;
//
//   return (
//     <li className="mt-2 flex text-sm text-black dark:text-white" key={item.title}>
//       <DynamicTag
//         prefetch={!active ? false : undefined}
//         href={href}
//         className={clsx('w-full hover:underline hover:underline-offset-4', {
//           'underline underline-offset-4': active
//         })}
//       >
//         {item.title}
//       </DynamicTag>
//     </li>
//   );
// }

export function FilterItem({ item }: { item: Category }) {
  // return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />;
  return <PathFilterItem item={item} />;
}
