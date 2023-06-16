import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@guitar-shop/core';
import { Product } from '@guitar-shop/shared-types';
import { ProductEntity } from './product.entity';
import { ProductQuery } from './query/product.query';
import { ProductSortField, ProductQueryDefault as PQ, ProductSort } from './product.constant';

@Injectable()
export class ProductRepository implements CRUDRepositoryInterface<ProductEntity, number, Product> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: ProductEntity): Promise<Product> {
    const entityData = item.toObject();
    return this.prisma.product.create({
      data: {
        ...entityData,
      },
    });
  }

  public async findById(id: number): Promise<Product> {
    return this.prisma.product.findFirst({
      where: { id },
    });
  }

  public async update(id: number, item: Partial<ProductEntity>): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...item,
        updatedAt: new Date(),
      }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    })
  }

  public async find({
    limit = PQ.DEFAULT_PRODUCT_QUERY_LIMIT,
    page = 1,
    guitarType,
    stringsCount,
    sortDirection = PQ.DEFAULT_PRODUCT_SORT_DIRECTION,
    sortType = ProductSort.Date,
    searchInTitle = ''
  }: ProductQuery): Promise<Product[]> {
    const sortField = { [ProductSortField[sortType]]: sortDirection };

    return this.prisma.product.findMany({
      take: limit,
      where: {
        guitarType,
        stringsCount,
        title: {
          contains: searchInTitle,
        }
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
