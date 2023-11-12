import { categoriesEntityFragment } from '../fragments/category';

export const getCategoryQuery = /* GraphQL */ `
  query getCategory($handle: String!, $locale: I18NLocaleCode!) {
    categories(locale: $locale, filters: { handle: { eq: $handle } }, pagination: { limit: 1 }) {
      ...categories
    }
  }
  ${categoriesEntityFragment}
`;

export const getCategoriesQuery = /* GraphQL */ `
  query getCategories($locale: I18NLocaleCode!) {
    categories(locale: $locale, sort: "rank:desc") {
      ...categories
    }
  }
  ${categoriesEntityFragment}
`;
