import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrderRdo {
  @ApiProperty({
    description: 'Order unique identifier',
    example: 1,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Total number of items in the order',
    example: 10,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    description: 'Total order price',
    example: 100000,
  })
  @Expose()
  total: number;

  @ApiProperty({
    description: 'Date the comment was created',
    example: `${new Date()}`,
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Date the comment was updated',
    example: `${new Date()}`,
  })
  @Expose()
  public updatedAt: Date;
}
