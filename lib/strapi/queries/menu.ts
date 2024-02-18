import { menuFragment } from '../fragments/menu';

export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!, $locale: I18NLocaleCode!) {
    menus(filters: { handle: { eq: $handle } }, locale: $locale) {
      ...menu
    }
  }
  ${menuFragment}
`;
