import { getFileUploadConfig } from '@guitar-shop/core';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getFileUploadConfig,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, Logger],
  exports:[ProductRepository]
})
export class ProductModule { }
