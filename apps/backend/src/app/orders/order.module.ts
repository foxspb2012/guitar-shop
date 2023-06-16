import { Module, Logger } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { ProductModule } from '../products/product.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports:[ProductModule, MailModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, Logger],
})
export class OrdersModule { }
