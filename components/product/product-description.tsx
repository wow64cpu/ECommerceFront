'use client';

import Price from 'components/price';
import { Product } from '../../lib/strapi/types';
import { useSearchParams } from 'next/navigation';

export function ProductDescription({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const variantSearchParam = searchParams.get('variant');
  const variantIndex = variantSearchParam ? parseInt(variantSearchParam) : 0;

  const variant = product.variants[variantIndex];

  if (!variant) return null;

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={variant.price.amount.toString()} currencyCode={variant.price.currency} />
        </div>
      </div>

      {/*<VariantSelector*/}
      {/*  options={product.options}*/}
      {/*  variants={product.variants}*/}
      {/*/>*/}

      {/*{product.descriptionHtml ? (*/}
      {/*  <Prose*/}
      {/*    className="mb-6 text-sm leading-tight dark:text-white/[60%]"*/}
      {/*    html={product.descriptionHtml}*/}
      {/*  />*/}
      {/*) : null}*/}

      <p className="mb-6 text-sm leading-tight dark:text-white/[60%]">{product.description}</p>

      {/*<AddToCart variants={product.variants} availableForSale={product.availableForSale} />*/}
    </>
  );
}
