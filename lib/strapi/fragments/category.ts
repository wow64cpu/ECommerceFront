export const detailedCategoryFragment = /* GraphQL */ `
  fragment detailedCategory on CategoryRelationResponseCollection {
    data {
      attributes {
        label
        products {
          ...products
        }
        handle
        updatedAt
      }
    }
  }
`;

export const categoryRelationFragment = /* GraphQL */ `
  fragment category on CategoryRelationResponseCollection {
    data {
      attributes {
        label
        handle
        updatedAt
      }
    }
  }
`;

export const categoriesRelationFragment = /* GraphQL */ `
  fragment categories on CategoryRelationResponseCollection {
    data {
      attributes {
        label
        handle
        updatedAt
      }
    }
  }
`;

export const categoriesEntityFragment = /* GraphQL */ `
  fragment categories on CategoryEntityResponseCollection {
    data {
      attributes {
        label
        handle
        updatedAt
      }
    }
  }
`;
