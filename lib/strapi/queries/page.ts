import { pageFragment } from '../fragments/page';
import seoFragment from '../fragments/seo';

export const getPageQuery = /* GraphQL */ `
  query getPage($handle: String!, $locale: I18NLocaleCode!) {
    pages(filters: { handle: { eq: $handle } }, locale: $locale, pagination: { limit: 1 }) {
      ...page
    }
  }
  ${pageFragment}
  ${seoFragment}
`;
