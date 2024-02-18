import Link from 'next/link';
import { GridTileImage } from './grid/tile';
import { getProducts } from '../lib/strapi';
import { useLocale } from 'next-intl';

export async function Carousel() {
  const locale = useLocale();

  const products = await getProducts(locale);

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              {product.variants.length > 0 &&
                product.variants[0] !== undefined &&
                product.variants[0].images[0] !== undefined && (
                  <GridTileImage
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.variants[0].price.amount.toString(),
                      currencyCode: product.variants[0].price.currency.toString()
                    }}
                    src={product.variants[0].images[0].url}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
