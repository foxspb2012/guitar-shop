import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Guitar, GuitarType, StringsCount } from '@guitar-shop/shared-types';
import { ProductDefaults, ProductValidity as PV } from '../product.constant';

export class ProductRdo {
  @ApiProperty({
    description: 'Product unique identifier',
    example: 1,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Fender',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Product description',
    example: 'The guitar is suitable for both the start of training and for home lessons...',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Product photo',
    example: `${ProductDefaults.Photo}`,
  })
  @Expose()
  public photo: string;

  @ApiProperty({
    description: 'Guitar type',
    example: `${Guitar.Electric}`,
    type: () => String,
    enum: Guitar,
  })
  @Expose()
  public guitarType: GuitarType;

  @ApiProperty({
    description: 'Article of the instrument',
    example: '123456',
  })
  @Expose()
  public article: string;

  @ApiProperty({
    description: 'The number of strings of the instrument',
    example: '6',
    type: () => Number,
    enum: StringsCount,
  })
  @Expose()
  public stringsCount: StringsCount;

  @ApiProperty({
    description: 'User rating',
    example: `${PV.RatingMaxValue}`,
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Product price',
    example: `${PV.PriceMaxValue}`,
  })
  @Expose()
  public price: number;

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
