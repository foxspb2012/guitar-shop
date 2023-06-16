import { Injectable } from '@nestjs/common'
import { Entity } from '@guitar-shop/core';
import { Comment } from '@guitar-shop/shared-types';
import { CommentDefaults } from './comment.constant';

@Injectable()
export class CommentEntity implements Entity<CommentEntity, Comment>, Comment {
  public id?: number;
  public userId: number;
  public productId: number;
  public score: number;
  public content: string;
  public advantages: string;
  public disadvantages: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(comment: Comment) {
    this.id = comment.id;
    this.userId = comment.userId;
    this.productId = comment.productId;
    this.score = comment.score || CommentDefaults.Score;
    this.content = comment.content;
    this.advantages = comment.advantages;
    this.disadvantages = comment.disadvantages;
    this.createdAt = comment.createdAt || new Date();
    this.updatedAt = comment.updatedAt || new Date();
  }
}
