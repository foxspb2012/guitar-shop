import { Injectable, Logger } from "@nestjs/common";
import { OrderNotFoundException, OrdersNotFoundException, ProductNotFoundException } from "@guitar-shop/core";
import { Order, OrderItem, User } from "@guitar-shop/shared-types";
import { ProductRepository } from "../products/product.repository";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderEntity } from "./order.entity";
import { OrderRepository } from './order.repository'
import { OrderQuery } from "./query/order.query";
import { MailService } from "../mail/mail.service";
import { UserEntity } from "../users/user.entity";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly mail: MailService,
    private readonly logger: Logger,
  ) { }

  async createOrder({ orderList }: CreateOrderDto, user: Partial<User>): Promise<Order> {
    const orderItems: OrderItem[] = [];

    for await (const item of orderList) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new ProductNotFoundException(this.logger, product.id);
      }
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        total: item.quantity * product.price,
      });
    }
    const orderEntity = new OrderEntity({ orderList: orderItems });
    await this.mail.sendNotifyNewOrder(new UserEntity(user), orderEntity);

    return this.orderRepository.create(orderEntity);
  }

  async deleteOrder(id: number): Promise<void> {
    const existOrder = await this.orderRepository.findById(id);
    if (!existOrder) {
      throw new OrderNotFoundException(this.logger, id);
    }
    this.orderRepository.destroy(id);
  }

  async getOrders(query: OrderQuery): Promise<Order[]> {
    const existOrders = await this.orderRepository.find(query);
    if (!existOrders?.length) {
      throw new OrdersNotFoundException(this.logger);
    }
    return existOrders;
  }

  async getOrder(id: number): Promise<Order> {
    const existOrder = await this.orderRepository.findById(id);
    if (!existOrder) {
      throw new OrderNotFoundException(this.logger, id);
    }

    return existOrder;
  }
}
