import { productsFragment, productVariantFragment } from '../fragments/product';
import pictogramFragment from '../fragments/pictogram';
import { categoriesRelationFragment } from '../fragments/category';
import { imageFragment, imagesFragment } from '../fragments/image';
import moneyFragment from '../fragments/money';
import seoFragment from '../fragments/seo';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!, $locale: I18NLocaleCode!) {
    products(filters: { handle: { eq: $handle } }, locale: $locale, pagination: { limit: 1 }) {
      ...products
    }
  }
  ${productVariantFragment}
  ${pictogramFragment}
  ${categoriesRelationFragment}
  ${productsFragment}
  ${imagesFragment}
  ${imageFragment}
  ${moneyFragment}
  ${seoFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($locale: I18NLocaleCode!, $query: String!) {
    products(
      locale: $locale
      filters: { or: [{ title: { containsi: $query } }, { description: { containsi: $query } }] }
    ) {
      ...products
    }
  }
  ${categoriesRelationFragment}
  ${productVariantFragment}
  ${pictogramFragment}
  ${productsFragment}
  ${imagesFragment}
  ${imageFragment}
  ${moneyFragment}
  ${seoFragment}
`;

export const getCategoryProductsQuery = /* GraphQL */ `
  query getProducts($locale: I18NLocaleCode!, $handle: String!) {
    products(locale: $locale, filters: { categories: { handle: { eq: $handle } } }) {
      ...products
    }
  }
  ${categoriesRelationFragment}
  ${productVariantFragment}
  ${pictogramFragment}
  ${productsFragment}
  ${imagesFragment}
  ${imageFragment}
  ${moneyFragment}
  ${seoFragment}
`;
