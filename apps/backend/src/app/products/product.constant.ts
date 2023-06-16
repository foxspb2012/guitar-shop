export enum ProductValidity {
  TitleMinLength = 10,
  TitleMaxLength = 100,
  DescriptionMinLength = 20,
  DescriptionMaxLength = 1024,
  ArticleMinLength = 5,
  ArticleMaxLength = 40,
  RatingMinValue = 0,
  RatingMaxValue = 5,
  PriceMinValue = 100,
  PriceMaxValue = 1000000,
}

export const ProductDefaults = {
  Rating: ProductValidity.RatingMinValue,
  Price: ProductValidity.PriceMinValue,
  CommentsCount: 0,
  Photo: 'default.jpg',
} as const;

export const ProductQueryDefault = {
  DEFAULT_PRODUCT_QUERY_LIMIT: 9,
  DEFAULT_PRODUCT_SORT_DIRECTION: 'desc',
} as const;

export enum ProductSort {
  Date = 'date',
  Rating = 'rating',
  Price = 'price',
}

export const ProductSortField = {
  [ProductSort.Date]: 'createdAt',
  [ProductSort.Rating]: 'rating',
  [ProductSort.Price]: 'price',
};
