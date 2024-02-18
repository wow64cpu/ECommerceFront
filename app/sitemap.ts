import { ensureStartsWith, validateEnvironmentVariables } from 'lib/utils';
import { MetadataRoute } from 'next';
import { getCategories, getProducts } from '../lib/strapi';
import { defaultLocale, locales } from '../i18n.config';
import * as process from 'process';

type Route = {
  url: string;
  lastModified: string;
};

const { STORE_DOMAIN, PORT = 3000 } = process.env;

const baseUrl = STORE_DOMAIN
  ? ensureStartsWith(STORE_DOMAIN, 'https://')
  : `http://localhost:${PORT}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  const categoriesPromise = getCategories(defaultLocale).then((categories) => {
    return categories.map((category) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/search/${category.handle}`,
        lastModified: category.updatedAt
      }))
    );
  });

  const productsPromise = getProducts(defaultLocale).then((products) => {
    return products.map((product) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/${product.handle}`,
        lastModified: product.updatedAt
      }))
    );
  });

  // TODO pages
  // const pagesPromise = getPages().then((pages) =>
  //   pages.map((page) => ({
  //     url: `${baseUrl}/${page.handle}`,
  //     lastModified: page.updatedAt
  //   }))
  // );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([
        categoriesPromise,
        // collectionsPromise,
        productsPromise
        // pagesPromise
      ])
    ).flat(2);
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
