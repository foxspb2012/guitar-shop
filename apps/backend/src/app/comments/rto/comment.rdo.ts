import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CommentValidity as CV } from '../comment.constant';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment unique identifier',
    example: 1,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User unique identifier',
    example: 1,
    minimum: CV.IdMinValue,
  })
  @Expose()
  public userId: number;

  @ApiProperty({
    description: 'Product unique identifier',
    example: 1,
    minimum: CV.IdMinValue,
  })
  @Expose()
  public productId: number;

  @ApiProperty({
    description: 'User rating of the product',
    example: 1,
    minimum: CV.ScoreMinValue,
    maximum: CV.ScoreMaxValue,
  })
  @Expose()
  public score: number;


  @ApiProperty({
    description: 'The content of the comment',
    example: 'The guitar has a great color, good wood. Heavy, there is no cover and belt included',
    minimum: CV.ContentMinLength,
    maximum: CV.ContentMaxLength,
  })
  @Expose()
  public content: string;

  @ApiProperty({
    description: 'Description of the advantages of the product',
    example: 'Good body, clear sound, good quality strings...',
    minimum: CV.AdvantagesMinLength,
    maximum: CV.AdvantagesMinLength,
  })
  @Expose()
  public advantages: string;

  @ApiProperty({
    description: 'Description of the disadvantages of the product',
    example: 'Tight spikes...',
    minimum: CV.DisadvantagesMinLength,
    maximum: CV.DisadvantagesMaxLength,
  })
  @Expose()
  public disadvantages: string;

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
