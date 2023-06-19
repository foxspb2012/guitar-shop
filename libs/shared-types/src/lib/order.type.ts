import { OrderItem } from './order-item.type';

export type Order = {
  id?:number;
  orderList: OrderItem[];
  quantity:number;
  total:number;
  createdAt?: Date;
  updatedAt?: Date;
}
