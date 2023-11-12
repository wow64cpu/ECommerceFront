export const productVariantFragment = /* GraphQL */ `
  fragment productVariant on ComponentExtProductVariant {
    description
    images {
      ...images
    }
    pictogram {
      ...pictogram
    }
    quantity
    price {
      ...money
    }
  }
`;

export const productFragment = /* GraphQL */ `
  fragment product on ProductEntityResponse {
    data {
      id
      attributes {
        handle
        title
        description
        categories {
          ...category
        }
        variants {
          ...productVariant
        }
        seo {
          ...seo
        }
        updatedAt
      }
    }
  }
`;

export const productsFragment = /* GraphQL */ `
  fragment products on ProductEntityResponseCollection {
    data {
      id
      attributes {
        handle
        title
        description
        categories {
          ...categories
        }
        variants {
          ...productVariant
        }
        seo {
          ...seo
        }
        updatedAt
      }
    }
  }
`;
