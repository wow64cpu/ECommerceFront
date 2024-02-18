const pictogramFragment = /* GraphQL */ `
  fragment pictogram on ComponentExtPictogram {
    image {
      ...image
    }
    color
  }
`;

export default pictogramFragment;
