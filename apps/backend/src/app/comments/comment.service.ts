import { CommentNotFoundException } from '@guitar-shop/core';
import { Comment } from '@guitar-shop/shared-types';
import { Injectable, Logger } from '@nestjs/common';
import { ProductRepository } from '../products/product.repository';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly productRepository: ProductRepository,
    private readonly logger: Logger,
  ) { }

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const productId = dto.productId;
    const existPublication = await this.productRepository.findById(productId);
    if (!existPublication) {
      throw new CommentNotFoundException(this.logger, productId);
    }
    const commentEntity = new CommentEntity(dto);
    return this.commentRepository.create(commentEntity);
  }

  async getComments(id: number): Promise<Comment[]> {
    const existComments = await this.commentRepository.find(id);
    if (!existComments?.length) {
      throw new CommentNotFoundException(this.logger, id);
    }
    return existComments;
  }
}
