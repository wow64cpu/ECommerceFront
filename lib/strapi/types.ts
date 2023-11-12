export type SEO = {
  metaTitle: string;
  metaDescription: string;
};

export type Money = {
  amount: number;
  currency: string;
};

export type StrapiPictogram = {
  image?: StrapiImage;
  color: string;
};

export type StrapiProductVariant = {
  description: string;
  images: StrapiImages;
  pictogram: StrapiPictogram;
  quantity: number;
  price: Money;
};

export type StrapiImageAttributes = {
  url: string;
  previewUrl: string;
  alternativeText: string;
  width: number;
  height: number;
};

export type StrapiImageData = {
  attributes: StrapiImageAttributes;
};

export type StrapiImage = {
  data: StrapiImageData;
};

export type StrapiImages = {
  data: StrapiImageData[];
};

export type StrapiMenuAttributes = {
  handle: string;
  title: string;
  path: string;
};

export type StrapiMenuData = {
  attributes: StrapiMenuAttributes;
};

export type StrapiMenu = {
  data: StrapiMenuData[];
};

export type StrapiPageAttributes = {
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type StrapiPageData = {
  attributes: StrapiPageAttributes;
};

export type StrapiPage = {
  data: StrapiPageData;
};

export type StrapiCategoryAttributes = {
  label: string;
  products: StrapiProduct[];
  handle: string;
  updatedAt: string;
};

export type StrapiCategoryData = {
  id: string;
  attributes: StrapiCategoryAttributes;
};

export type StrapiCategory = {
  data: StrapiCategoryData;
};

export type StrapiCategories = {
  data: StrapiCategoryData[];
};

export type StrapiProductAttributes = {
  handle: string;
  title: string;
  description: string;
  categories: StrapiCategories;
  variants: StrapiProductVariant[];
  seo?: SEO;
  updatedAt: string;
};

export type StrapiProductData = {
  id: string;
  attributes: StrapiProductAttributes;
};

export type StrapiProduct = {
  data: StrapiProductData;
};

export type StrapiMenuOperation = {
  data: {
    menus: StrapiMenu;
  };
  variables: {
    handle: string;
    locale: string;
  };
};

export type StrapiPageOperation = {
  data: {
    pages: {
      data: StrapiPageData[];
    };
  };
  variables: {
    handle: string;
    locale: string;
  };
};

export type StrapiProductOperation = {
  data: {
    products: {
      data: StrapiProductData[];
    };
  };
  variables: {
    handle: string;
    locale: string;
  };
};

export type StrapiProductsOperation = {
  data: {
    products: {
      data: StrapiProductData[];
    };
  };
  variables: {
    locale: string;
    query: string;
  };
};

export type StrapiCategoryOperation = {
  data: {
    categories: StrapiCategories;
  };
  variables: {
    handle: string;
    locale: string;
  };
};

export type StrapiCategoryProductsOperation = {
  data: {
    products: {
      data: StrapiProductData[];
    };
  };
  variables: {
    handle: string;
    locale: string;
  };
};

export type StrapiCategoriesOperation = {
  data: {
    categories: StrapiCategories;
  };
  variables: {
    locale: string;
  };
};

export type Image = StrapiImageAttributes;

export type Pictogram = Omit<StrapiPictogram, 'image'> & {
  image?: Image;
};

export type Menu = StrapiMenuAttributes;

export type Page = StrapiPageAttributes;

export type Category = Omit<StrapiCategoryAttributes, 'products'> & {
  products: Product[];
};

export type ProductVariant = Omit<StrapiProductVariant, 'images' | 'pictogram'> & {
  images: Image[];
  pictogram: Pictogram;
};

export type Product = Omit<StrapiProductAttributes, 'id' | 'categories' | 'variants'> & {
  id: string;
  categories: Category[];
  variants: ProductVariant[];
};
