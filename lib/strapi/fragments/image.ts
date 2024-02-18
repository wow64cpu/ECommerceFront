export const imageFragment = /* GraphQL */ `
  fragment image on UploadFileEntityResponse {
    data {
      attributes {
        url
        previewUrl
        alternativeText
        width
        height
      }
    }
  }
`;

export const imagesFragment = /* GraphQL */ `
  fragment images on UploadFileRelationResponseCollection {
    data {
      attributes {
        url
        previewUrl
        alternativeText
        width
        height
      }
    }
  }
`;

// UploadFileRelationResponseCollection
// UploadFileEntityResponse
