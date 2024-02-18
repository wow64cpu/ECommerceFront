import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';
import { getProducts } from '../../lib/strapi';
import { Product } from '../../lib/strapi/types';
import { useLocale } from 'next-intl';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
        {/*<GridTileImage*/}
        {/*  src={item.featuredImage.url}*/}
        {/*  fill*/}
        {/*  sizes={*/}
        {/*    size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'*/}
        {/*  }*/}
        {/*  priority={priority}*/}
        {/*  alt={item.title}*/}
        {/*  label={{*/}
        {/*    position: size === 'full' ? 'center' : 'bottom',*/}
        {/*    title: item.title as string,*/}
        {/*    amount: item.priceRange.maxVariantPrice.amount,*/}
        {/*    currencyCode: item.priceRange.maxVariantPrice.currencyCode*/}
        {/*  }}*/}
        {/*/>*/}
        {item.variants.length > 0 &&
          item.variants[0] !== undefined &&
          item.variants[0].images[0] !== undefined && (
            <GridTileImage
              alt={item.title}
              priority={priority}
              label={{
                position: size === 'full' ? 'center' : 'bottom',
                title: item.title,
                amount: item.variants[0].price.amount.toString(),
                currencyCode: item.variants[0].price.currency.toString()
              }}
              src={item.variants[0].images[0].url}
              fill
              sizes={
                size === 'full'
                  ? '(min-width: 768px) 66vw, 100vw'
                  : '(min-width: 768px) 33vw, 100vw'
              }
            />
          )}
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const homepageItems = await getCollectionProducts({
  //   collection: 'hidden-homepage-featured-items'
  // });
  const locale = useLocale();

  const homepageItems = await getProducts(locale);

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
