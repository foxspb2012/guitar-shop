import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@guitar-shop/core';
import { Comment } from '@guitar-shop/shared-types';
import { CommentEntity } from './comment.entity';
import { CommentQueryDefault as CQ } from './comment.constant';

@Injectable()
export class CommentRepository implements CRUDRepositoryInterface<CommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: CommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    const { productId, userId, score, content, advantages, disadvantages } = entityData;

    const { commentsCount } = await this.prisma.product.findFirst({
      where: { id: productId },
      select: {
        commentsCount: true,
      }
    });

    const { _avg } = await this.prisma.comment.aggregate({
      _avg: {
        score: true,
      },
      where: {
        productId
      }
    });

    const newRating = Math.round((_avg.score * commentsCount + score) / (commentsCount + 1));

    const [comment] = await this.prisma.$transaction([
      this.prisma.comment.create({
        data: {
          userId, score, content, advantages, disadvantages,
          product: {
            connect: {
              id: productId
            }
          }
        },
      }),
      this.prisma.product.update({
        where: { id: productId },
        data: {
          commentsCount: {
            increment: 1
          },
          rating: newRating,
        }
      })
    ]);

    return comment;
  }

  public async findById(id: number): Promise<Comment> {
    return this.prisma.comment.findFirst({
      where: { id },
    });
  }

  public async update(id: number, item: Partial<CommentEntity>): Promise<Comment> {
    return this.prisma.comment.update({
      where: { id },
      data: {
        ...item,
      }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: { id },
    })
  }

  public async find(id: number): Promise<Comment[]> {

    return this.prisma.comment.findMany({
      take: CQ.DEFAULT_COMMENT_QUERY_LIMIT,
      where: {
        product: {
          id
        }
      },
      orderBy: [
        {
          createdAt: CQ.DEFAULT_COMMENT_SORT_DIRECTION,
        }
      ],
    });
  }
}
