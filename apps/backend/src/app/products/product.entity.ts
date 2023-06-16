import { Injectable } from '@nestjs/common'
import { Entity } from '@guitar-shop/core';
import { Guitar, GuitarType, Product, StringsCount } from '@guitar-shop/shared-types';
import { ProductDefaults } from './product.constant';

@Injectable()
export class ProductEntity implements Entity<ProductEntity, Product>, Product {
  public id?: number;
  public title: string;
  public description: string;
  public photo: string;
  public guitarType: GuitarType;
  public article: string;
  public stringsCount: StringsCount;
  public rating?: number;
  public price: number;
  public commentsCount?: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(product: Product) {
    this.fillEntity(product);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.photo = ProductDefaults.Photo;
    this.article = product.article;
    this.guitarType = product.guitarType || Guitar.Electric;
    this.stringsCount = product.stringsCount || StringsCount.Six;
    this.rating = product.rating || ProductDefaults.Rating;
    this.price = product.price || ProductDefaults.Price;
    this.commentsCount = ProductDefaults.CommentsCount;
    this.createdAt = product.createdAt || new Date();
    this.updatedAt = product.updatedAt || new Date();
  }
}
