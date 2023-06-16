import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Guitar, GuitarType, StringsCount } from '@guitar-shop/shared-types';
import { ValidityMessage as VM } from '@guitar-shop/core';
import { ProductValidity as PV } from '../product.constant';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Fender',
    required: true,
    minimum: PV.TitleMinLength,
    maximum: PV.TitleMaxLength,
  })
  @Transform(({ value }) => value instanceof String ? value.trim() : value)
  @MinLength(PV.TitleMinLength, { message: VM.MinValueMessage })
  @MaxLength(PV.TitleMaxLength, { message: VM.MaxValueMessage })
  public title: string;

  @ApiProperty({
    description: 'Product description',
    example: 'The guitar is suitable for both the start of training and for home lessons...',
    required: true,
    minimum: PV.DescriptionMinLength,
    maximum: PV.DescriptionMaxLength,
  })
  @Transform(({ value }) => value instanceof String ? value.trim() : value)
  @MinLength(PV.DescriptionMinLength, { message: VM.MinValueMessage })
  @MaxLength(PV.DescriptionMaxLength, { message: VM.MaxValueMessage })
  public description: string;

  @ApiProperty({
    description: 'Guitar type',
    example: `${Guitar.Electric}`,
    type: () => String,
    enum: Guitar,
    required: true,
  })
  @IsEnum(Guitar, { message: `${VM.IsEnumMessage} ${Object.values(Guitar).join(', ')}` })
  public guitarType: GuitarType;

  @ApiProperty({
    description: 'Article of the instrument',
    example: '123456',
    required: true,
    minimum: PV.ArticleMinLength,
    maximum: PV.ArticleMaxLength,
  })
  @Transform(({ value }) => value instanceof String ? value.trim() : value)
  @MinLength(PV.ArticleMinLength, { message: VM.MinValueMessage })
  @MaxLength(PV.ArticleMaxLength, { message: VM.MaxValueMessage })
  public article: string;

  @ApiProperty({
    description: 'The number of strings of the instrument',
    example: 6,
    type: () => Number,
    enum: StringsCount,
    required: true,
  })
  @IsEnum(StringsCount, { message: `${VM.IsEnumMessage} ${Object.values(StringsCount).filter(item => Number.isInteger(item)).join(', ')}` })
  public stringsCount: StringsCount;

  @ApiProperty({
    description: 'User rating',
    example: `${PV.RatingMaxValue}`,
    required: false,
    minimum: PV.RatingMinValue,
    maximum: PV.RatingMaxValue,
  })
  @Min(PV.RatingMinValue, { message: VM.MinValueMessage })
  @Max(PV.RatingMaxValue, { message: VM.MaxValueMessage })
  @IsOptional()
  public rating?: number;

  @ApiProperty({
    description: 'Product price',
    example: `${PV.PriceMaxValue}`,
    required: true,
    minimum: PV.PriceMinValue,
    maximum: PV.PriceMaxValue,
  })
  @Min(PV.PriceMinValue, { message: VM.MinValueMessage })
  @Max(PV.PriceMaxValue, { message: VM.MaxValueMessage })
  public price: number;

  public photo?: string;
}
