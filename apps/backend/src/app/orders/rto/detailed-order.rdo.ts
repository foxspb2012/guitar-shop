import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DetailedOrderItemRdo } from './detailed-order-item.rdo';
import { OrderRdo } from './order.rdo';

export class DetailedOrderRdo extends OrderRdo {
  @ApiProperty({
    description: 'Array of orders',
    type:()=>[DetailedOrderItemRdo],
    required: true,
  })
  @Expose()
  public orderList: DetailedOrderItemRdo[];
}
