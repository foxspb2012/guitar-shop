import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Min, Max, MaxLength, MinLength } from 'class-validator';
import { ValidityMessage as VM } from '@guitar-shop/core';
import { CommentValidity as CV } from '../comment.constant';

export class CreateCommentDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 1,
    required: true,
    minimum: CV.IdMinValue,
  })
  @Min(CV.IdMinValue, { message: VM.MinValueMessage })
  public userId: number;

  @ApiProperty({
    description: 'Product unique identifier',
    example: 1,
    required: true,
    minimum: CV.IdMinValue,
  })
  @Min(CV.IdMinValue, { message: VM.MinValueMessage })
  public productId: number;

  @ApiProperty({
    description: 'User rating of the product',
    example: 1,
    required: true,
    minimum: CV.ScoreMinValue,
    maximum: CV.ScoreMaxValue,
  })
  @Min(CV.ScoreMinValue, { message: VM.MinValueMessage })
  @Max(CV.ScoreMaxValue, { message: VM.MaxValueMessage })
  public score: number;


  @ApiProperty({
    description: 'The content of the comment',
    example: 'The guitar has a great color, good wood. Heavy, there is no cover and belt included',
    required: true,
    minimum: CV.ContentMinLength,
    maximum: CV.ContentMaxLength,
  })
  @Transform(({ value }) => value instanceof String ? value.trim() : value)
  @MinLength(CV.ContentMinLength, { message: VM.MinValueMessage })
  @MaxLength(CV.ContentMaxLength, { message: VM.MaxValueMessage })
  public content: string;

  @ApiProperty({
    description: 'Description of the advantages of the product',
    example: 'Good body, clear sound, good quality strings...',
    required: true,
    minimum: CV.AdvantagesMinLength,
    maximum: CV.AdvantagesMinLength,
  })
  @Transform(({ value }) => value instanceof String ? value.trim() : value)
  @MinLength(CV.AdvantagesMinLength, { message: VM.MinValueMessage })
  @MaxLength(CV.AdvantagesMaxLength, { message: VM.MaxValueMessage })
  public advantages: string;

  @ApiProperty({
    description: 'Description of the disadvantages of the product',
    example: 'Tight spikes...',
    required: true,
    minimum: CV.DisadvantagesMinLength,
    maximum: CV.DisadvantagesMaxLength,
  })
  @Transform(({ value }) => value instanceof String ? value.trim() : value)
  @MinLength(CV.DisadvantagesMinLength, { message: VM.MinValueMessage })
  @MaxLength(CV.DisadvantagesMaxLength, { message: VM.MaxValueMessage })
  public disadvantages: string;
}
