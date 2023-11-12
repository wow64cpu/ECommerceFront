import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';
import { Product } from '../../lib/strapi/types';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product, i) => (
        // <Grid.Item key={product.handle} className="animate-fadeIn">
        //   <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
        //     <GridTileImage
        //       alt={product.title}
        //       label={{
        //         title: product.title,
        //         amount: product.priceRange.maxVariantPrice.amount,
        //         currencyCode: product.priceRange.maxVariantPrice.currencyCode
        //       }}
        //       src={product.featuredImage?.url}
        //       fill
        //       sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        //     />
        //   </Link>
        // </Grid.Item>
        <Grid.Item key={`${product.handle}${i}`} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
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
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              )}
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
