import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCategory, getCategoryProducts } from '../../../../lib/strapi';
import { useLocale } from 'next-intl';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { collection: string; locale: string };
}): Promise<Metadata> {
  const category = await getCategory(params.collection, params.locale);

  if (!category) return notFound();

  // return {
  //   title: category.seo?.title || category.title,
  //   description:
  //     category.seo?.description || category.description || `${category.title} products`
  // };

  return {
    title: category.label
  };
}

export default async function CategoryPage({
  params
} // searchParams
: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const locale = useLocale();

  const products = await getCategoryProducts(params.collection, locale);

  return (
    <section>
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      )}
    </section>
  );
}
