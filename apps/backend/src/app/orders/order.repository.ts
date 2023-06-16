import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@guitar-shop/core';
import { Order } from '@guitar-shop/shared-types';
import { OrderEntity } from './order.entity';
import { OrderQueryDefault as OQ, OrderSort, OrderSortField } from './order.constant'
import { OrderQuery } from './query/order.query';

@Injectable()
export class OrderRepository implements CRUDRepositoryInterface<OrderEntity, number, Order> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: OrderEntity): Promise<Order> {
    const { orderList, quantity, total } = item.toObject();

    return this.prisma.order.create({
      data: {
        quantity,
        total,
        orderList: {
          createMany: {
            data: [
              ...orderList,
            ]
          }
        }
      },
      include: {
        orderList: true,
      }
    });
  }

  public async findById(id: number): Promise<Order> {
    return this.prisma.order.findFirst({
      where: { id },
      include: {
        orderList: true
      }
    });
  }

  public async update(id: number, item: Omit<Partial<OrderEntity>, 'orderList'>): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...item,
      },
      include: {
        orderList: true
      }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    })
  }

  public async find({
    limit = OQ.DEFAULT_ORDER_QUERY_LIMIT,
    page = 1,
    sortDirection = OQ.DEFAULT_ORDER_SORT_DIRECTION,
    sortType = OrderSort.Date,
  }: OrderQuery): Promise<Order[]> {
    const sortField = { [OrderSortField[sortType]]: sortDirection };

    return this.prisma.order.findMany({
      take: limit,
      include: {
        orderList: true
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
