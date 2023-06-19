import { GuitarType } from './guitar-type.enum';
import { StringsCount } from './strings-count.enum';

export type Product = {
  id?: number;
  title: string;
  description: string;
  photo: string;
  guitarType: GuitarType;
  article: string;
  stringsCount: StringsCount;
  rating?: number;
  price: number;
  commentsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
