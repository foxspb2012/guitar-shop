import { Injectable } from '@nestjs/common'
import { Entity } from '@guitar-shop/core';
import { Order, OrderItem } from '@guitar-shop/shared-types';

@Injectable()
export class OrderEntity implements Entity<OrderEntity, Order>, Order {
  public id?: number;
  public orderList: OrderItem[];
  public quantity: number;
  public total: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(order: Partial<Order>) {
    this.fillEntity(order);
  }

  public toObject() {
    return { ...this };
  }

  private getTotalQuantity() {
    let quantity = 0;
    for (const item of this.orderList) {
      quantity += item.quantity;
    }

    return quantity;
  }

  private getTotalPrice() {
    let total = 0;
    for (const item of this.orderList) {
      item.total = item.price * item.quantity;
      total += item.total;
    }

    return total;
  }

  public fillEntity(order: Partial<Order>) {
    this.id = order.id;
    this.orderList = order.orderList;
    this.quantity = this.getTotalQuantity();
    this.total = this.getTotalPrice();
    this.createdAt = order.createdAt || new Date();
    this.updatedAt = order.updatedAt || new Date();
  }
}
