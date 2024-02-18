export const pageFragment = /* GraphQL */ `
  fragment page on PageEntityResponseCollection {
    data {
      attributes {
        title
        handle
        body
        bodySummary
        seo {
          ...seo
        }
        createdAt
        updatedAt
      }
    }
  }
`;
