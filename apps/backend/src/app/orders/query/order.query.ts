import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { ValidityMessage as VM } from '@guitar-shop/core';
import { OrderQueryDefault as OQ, OrderSort } from '../order.constant';

export class OrderQuery {
  @Transform(({ value }) => +value || OQ.DEFAULT_ORDER_QUERY_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(OrderSort, { message: VM.IsEnumMessage })
  @IsOptional()
  public sortType?: OrderSort = OrderSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = OQ.DEFAULT_ORDER_SORT_DIRECTION;
}
