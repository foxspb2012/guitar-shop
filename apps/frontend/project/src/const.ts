export const ITEMS_PER_PAGE = 9;
export const RATING_ITEMS = 5;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Registration = '/registration',
  Catalog = '/catalog',
  Item = '/item/:id'
}

export enum APIRoute {
  Guitars = '/guitars/',
  Comments = '/comments',
  Coupon = '/coupons',
  Register = '/users/register',
  Login = '/users/login',
}

export enum NameSpace {
  Guitars = 'GUITARS',
  Guitar = 'GUITAR',
  Reviews = 'COMMENTS',
  Cart = 'CART',
  Coupon = 'COUPON',
  User = 'USER',
}

export const months = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноябрья',
  'Декабря',
];

export const RatingText = {
  1: 'Отлично',
  2: 'Хорошо',
  3: 'Нормально',
  4: 'Плохо',
  5: 'Ужасно',
} as const;

export const GuitarType = {
  electric: 'Электрогитара',
  ukulele: 'Укулеле',
  acoustic: 'Акустическая гитара',
  unknown: 'Тип неизветен',
} as const;

export enum CommentFieldsName {
  UserName = 'user-name',
  Adv = 'adv',
  Disadv = 'disadv',
}

export enum StringsCount {
  Four = '4',
  Six = '6',
  Seven = '7',
  Twelve = '12',
}

export enum SortType {
  Default = 'default',
  Price = 'price',
  Rate = 'rating',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
