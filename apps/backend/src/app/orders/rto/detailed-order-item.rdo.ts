import { ApiProperty } from '@nestjs/swagger';
import { OrderValidity as OV } from '../order.constant';
import { Expose, Type } from 'class-transformer';
import { ProductRdo } from '../../products/rto/product.rdo';

export class DetailedOrderItemRdo {
  @ApiProperty({
    description: 'Product object',
    type: () => ProductRdo,
  })
  @Expose()
  @Type(() => ProductRdo)
  public product: ProductRdo;

  @ApiProperty({
    description: 'Product price',
    example: `${OV.QuantityMinValue}`,
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Number of product units',
    example: 10,
  })
  @Expose()
  public quantity: number;

  @ApiProperty({
    description: 'Total order item price',
    example: 10,
  })
  @Expose()
  public total: number;
}
