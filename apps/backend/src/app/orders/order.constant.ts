export enum OrderValidity {
  QuantityMinValue = 1,
}

export const OrderQueryDefault = {
  DEFAULT_ORDER_QUERY_LIMIT: 6,
  DEFAULT_ORDER_SORT_DIRECTION: 'desc',
} as const;

export enum OrderSort {
  Date = 'date',
  Price = 'price',
}

export const OrderSortField = {
  [OrderSort.Date]: 'createdAt',
  [OrderSort.Price]: 'total',
};
