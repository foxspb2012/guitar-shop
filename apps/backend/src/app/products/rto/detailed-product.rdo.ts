import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProductValidity as PV } from '../product.constant';
import { ProductRdo } from './product.rdo';

export class DetailedProductRdo extends ProductRdo {
  @ApiProperty({
    description: 'Number of product reviews',
    example: `${PV.PriceMaxValue}`,
  })
  @Expose()
  public commentsCount: number;
}
