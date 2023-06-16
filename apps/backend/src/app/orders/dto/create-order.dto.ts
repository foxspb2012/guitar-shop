import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ValidityMessage as VM } from '@guitar-shop/core';
import { CreateOrderItemDto } from './create-order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Array of orders (OrderItemDto entities)',
    type: () => [CreateOrderItemDto],
    required: true,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayNotEmpty({ message: VM.IsNotEmptyMessage })
  @IsArray({ message: VM.IsArrayMessage })
  public orderList: CreateOrderItemDto[];
}
