import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ValidityMessage as VM } from '@guitar-shop/core';
import { Guitar, GuitarType, StringsCount } from '@guitar-shop/shared-types'
import { ProductQueryDefault as PQ, ProductSort } from '../product.constant';

export class ProductQuery {
  @Transform(({ value }) => +value || PQ.DEFAULT_PRODUCT_QUERY_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsEnum(Guitar, { message: VM.IsEnumMessage })
  @IsOptional()
  public guitarType?: GuitarType;

  @Transform(({ value }) => +value)
  @IsEnum(StringsCount, { message: `${VM.IsEnumMessage} ${Object.values(StringsCount).filter(item => Number.isInteger(item)).join(', ')}` })
  @IsOptional()
  public stringsCount?: StringsCount;

  @IsEnum(ProductSort, { message: VM.IsEnumMessage })
  @IsOptional()
  public sortType?: ProductSort = ProductSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = PQ.DEFAULT_PRODUCT_SORT_DIRECTION;

  @Transform(({ value }) => value instanceof String ? value.toLocaleLowerCase() : value)
  @IsString()
  @IsOptional()
  public searchInTitle?: string = '';
}
