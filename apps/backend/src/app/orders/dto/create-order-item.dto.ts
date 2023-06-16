import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { ValidityMessage as VM } from '@guitar-shop/core';
import { OrderValidity as OV } from '../order.constant';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'Product unique identifier',
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: VM.IsEmailMessage })
  public productId: number;

  @ApiProperty({
    description: 'Number of product units',
    example: `${OV.QuantityMinValue}`,
    required: true,
  })
  @Min(OV.QuantityMinValue, { message: VM.MinValueMessage })
  public quantity: number;
}
