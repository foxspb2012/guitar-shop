import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product } from '@guitar-shop/shared-types';
import { ProductNotFoundException, ProductsNotFoundException } from '@guitar-shop/core';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductQuery } from './query/product.query';
import { existsSync, unlinkSync } from 'fs';
import { resolve } from 'path'

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) { }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const publicationEntity = new ProductEntity({ ...dto, photo: '' });
    return this.productRepository.create(publicationEntity);
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    const existProduct = await this.productRepository.findById(id);
    if (!existProduct) {
      throw new ProductNotFoundException(this.logger, id);
    }

    const productPhoto = existProduct?.photo;
    if (productPhoto && dto.photo) {
      const avatarPath = resolve(__dirname, `${process.env.FILE_UPLOAD_DEST}/${existProduct.id}/${productPhoto}`);
      if (existsSync(avatarPath)) {
        console.log(avatarPath)
        unlinkSync(avatarPath);
      }
    }

    return this.productRepository.update(id, { ...dto, updatedAt: new Date() });
  }

  async deleteProduct(id: number): Promise<void> {
    const existProduct = await this.productRepository.findById(id);
    if (!existProduct) {
      throw new ProductNotFoundException(this.logger, id);
    }
    this.productRepository.destroy(id);
  }

  async getProducts(query: ProductQuery): Promise<Product[]> {
    const existProducts = await this.productRepository.find(query);
    if (!existProducts?.length) {
      throw new ProductsNotFoundException(this.logger);
    }
    return existProducts;
  }

  async getProduct(id: number): Promise<Product> {
    const existProduct = await this.productRepository.findById(id);
    if (!existProduct) {
      throw new ProductNotFoundException(this.logger, id);
    }

    return existProduct;
  }

  async getProductPhoto(id: number): Promise<string> {
    const existProduct = await this.productRepository.findById(id);
    if (!existProduct) {
      throw new ProductNotFoundException(this.logger, id);
    }

    const fileName = existProduct.photo;
    const folderPath = this.configService.get<string>('file.dest');

    return resolve(__dirname, folderPath, `${id}`, fileName);
  }
}
