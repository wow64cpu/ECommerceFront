// import {ensureStartsWith} from "../utils";
import { STRAPI_GRAPHQL_API_ENDPOINT } from '../constants';
import { isStrapiError } from '../type-guards';
import {
  Category,
  Image,
  Menu,
  Page,
  Pictogram,
  Product,
  ProductVariant,
  StrapiCategories,
  StrapiCategoriesOperation,
  StrapiCategory,
  StrapiCategoryData,
  StrapiCategoryOperation,
  StrapiCategoryProductsOperation,
  StrapiImage,
  StrapiImageData,
  StrapiImages,
  StrapiMenuData,
  StrapiMenuOperation,
  StrapiPageData,
  StrapiPageOperation,
  StrapiPictogram,
  StrapiProduct,
  StrapiProductData,
  StrapiProductOperation,
  StrapiProductsOperation,
  StrapiProductVariant
} from './types';
import { getCategoryProductsQuery, getProductQuery, getProductsQuery } from './queries/product';
import { getCategoriesQuery, getCategoryQuery } from './queries/category';
import { getMenuQuery } from './queries/menu';
import { getPageQuery } from './queries/page';
import { NextRequest, NextResponse } from 'next/server';

// const domain = process.env.STRAPI_STORE_DOMAIN
//     ? ensureStartsWith(process.env.STRAPI_STORE_DOMAIN, 'https://')
//     : '';
const domain = process.env.STRAPI_STORE_DOMAIN;
const endpoint = `${domain}${STRAPI_GRAPHQL_API_ENDPOINT}`;
const key = process.env.STRAPI_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function strapiFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<
  | {
      status: number;
      body: T;
    }
  | never
> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isStrapiError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const reshapeImageData = (image: StrapiImageData, alternativeTextPlaceholder: string): Image => ({
  ...image.attributes,
  url: `${domain}${image.attributes.url}`,
  previewUrl: image.attributes.previewUrl && `${domain}${image.attributes.previewUrl}`,
  alternativeText: image.attributes.alternativeText || alternativeTextPlaceholder
});

const reshapeImage = (image: StrapiImage, alternativeTextPlaceholder: string): Image =>
  reshapeImageData(image.data, alternativeTextPlaceholder);

const reshapeImages = (images: StrapiImages, alternativeTextPlaceholder: string): Image[] => {
  return images.data.map((image) => reshapeImageData(image, alternativeTextPlaceholder));
};

const reshapePictogram = (pictogram: StrapiPictogram): Pictogram => ({
  ...pictogram,
  image: pictogram.image?.data && reshapeImage(pictogram.image, pictogram.color)
});

const reshapeProductVariants = (variants: StrapiProductVariant[]): ProductVariant[] => {
  return variants.map((variant) => {
    const { images, pictogram, ...rest } = variant;
    return {
      ...rest,
      images: reshapeImages(variant.images, variant.description),
      pictogram: reshapePictogram(variant.pictogram)
    };
  });
};

const reshapeCategoryData = (category: StrapiCategoryData): Category => ({
  label: category.attributes.label,
  products: (category.attributes.products && reshapeProducts(category.attributes.products)) || [],
  handle: category.attributes.handle,
  updatedAt: category.attributes.updatedAt
});

const reshapeCategory = (category: StrapiCategory): Category => reshapeCategoryData(category.data);

const reshapeCategoriesData = (categories: StrapiCategoryData[]) => {
  return categories.map((category) => reshapeCategoryData(category));
};

const reshapeCategories = (categories: StrapiCategories) => {
  return categories.data.map((category) => reshapeCategoryData(category));
};

const reshapeProductData = (product: StrapiProductData): Product => {
  const { variants, categories, ...rest } = product.attributes;
  return {
    id: product.id,
    ...rest,
    variants: reshapeProductVariants(variants),
    categories: reshapeCategories(categories)
  };
};

const reshapeProduct = (product: StrapiProduct): Product => reshapeProductData(product.data);

const reshapeProductsData = (products: StrapiProductData[]): Product[] => {
  return products.map((product) => reshapeProductData(product));
};

const reshapeProducts = (products: StrapiProduct[]): Product[] => {
  return products.map((product) => reshapeProduct(product));
};

const reshapeMenuData = (menu: StrapiMenuData[]): Menu[] => {
  return menu.map((item) => item.attributes);
};

const reshapePageData = (page: StrapiPageData): Page => {
  return page.attributes;
};

export async function getMenu(handle: string, locale: string): Promise<Menu[]> {
  const res = await strapiFetch<StrapiMenuOperation>({
    query: getMenuQuery,
    variables: {
      handle,
      locale
    }
  });
  return reshapeMenuData(res.body.data.menus.data);
}

export async function getPage(handle: string, locale: string): Promise<Page | undefined> {
  const res = await strapiFetch<StrapiPageOperation>({
    query: getPageQuery,
    variables: {
      handle,
      locale
    }
  });
  const pageData = res.body.data.pages.data[0];
  return pageData && reshapePageData(pageData);
}

export async function getProduct(handle: string, locale: string): Promise<Product | undefined> {
  const res = await strapiFetch<StrapiProductOperation>({
    query: getProductQuery,
    variables: {
      handle,
      locale
    }
  });
  const productData = res.body.data.products.data[0];
  return productData && reshapeProductData(productData);
}

export async function getProducts(locale: string, query: string = ''): Promise<Product[]> {
  const res = await strapiFetch<StrapiProductsOperation>({
    query: getProductsQuery,
    variables: {
      locale,
      query
    }
  });
  return reshapeProductsData(res.body.data.products.data);
}

export async function getCategory(handle: string, locale: string): Promise<Category | undefined> {
  const res = await strapiFetch<StrapiCategoryOperation>({
    query: getCategoryQuery,
    variables: {
      handle,
      locale
    }
  });
  const categoryData = res.body.data.categories.data[0];
  return categoryData && reshapeCategoryData(categoryData);
}

export async function getCategoryProducts(handle: string, locale: string): Promise<Product[]> {
  const res = await strapiFetch<StrapiCategoryProductsOperation>({
    query: getCategoryProductsQuery,
    variables: {
      handle,
      locale
    }
  });
  return reshapeProductsData(res.body.data.products.data);
}

export async function getCategories(locale: string): Promise<Category[]> {
  const res = await strapiFetch<StrapiCategoriesOperation>({
    query: getCategoriesQuery,
    variables: {
      locale
    }
  });
  return reshapeCategoriesData(res.body.data.categories.data);
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // TODO
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
