import { SortFilterItem } from 'lib/constants';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';
import { Category } from '../../../../lib/strapi/types';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: Category[] }) {
  return (
    <>
      {list.map((item: Category, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({ list, title }: { list: Category[]; title?: string }) {
  return (
    <>
      <nav>
        {title ? (
          <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:block">
          <FilterItemList list={list} />
        </ul>
        <ul className="md:hidden">
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  );
}
