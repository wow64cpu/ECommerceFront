'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Product } from '../../lib/strapi/types';
import clsx from 'clsx';

export function Gallery({ product }: { product: Product }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const variantSearchParam = searchParams.get('variant');
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;
  const variantIndex = variantSearchParam ? parseInt(variantSearchParam) : 0;

  const variant = product.variants[variantIndex];

  if (!variant) return null;

  const images = variant.images;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  nextSearchParams.set('variant', variantIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  previousSearchParams.set('variant', variantIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {variant.images[imageIndex] && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={variant.images[imageIndex]?.alternativeText as string}
            src={variant.images[imageIndex]?.url as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <Link
                aria-label="Previous product image"
                href={previousUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowLeftIcon className="h-5" />
              </Link>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <Link
                aria-label="Next product image"
                href={nextUrl}
                className={buttonClassName}
                scroll={false}
              >
                <ArrowRightIcon className="h-5" />
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {product.variants.length > 1 ? (
        <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {product.variants.map((variant, index) => {
            const image = variant.images[0];

            if (!image) return null;

            const isActive = index === variantIndex;
            const variantSearchParams = new URLSearchParams(searchParams.toString());

            variantSearchParams.set('image', '0');
            variantSearchParams.set('variant', index.toString());

            return (
              <li key={image.url} className="h-10 w-10">
                <Link
                  aria-label="Enlarge product image"
                  href={createUrl(pathname, variantSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                >
                  {variant.pictogram.image ? (
                    <GridTileImage
                      alt={variant.pictogram.image.alternativeText}
                      src={variant.pictogram.image.url}
                      width={80}
                      height={80}
                      active={isActive}
                    />
                  ) : (
                    <div
                      className={clsx(
                        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
                        {
                          'border-2 border-blue-600': isActive,
                          'border-neutral-200 dark:border-neutral-800': !isActive
                        }
                      )}
                      style={{
                        backgroundColor: variant.pictogram.color
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
