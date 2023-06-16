import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import {
  fileUploadOptions,
  frontendUrlOptions,
  jwtOptions,
  mailOptions,
} from '@guitar-shop/core';
import { ENV_FILE_PATH } from './app.constant';
import { envValidationSchema } from './env.validation.schema';
import { UsersModule } from './users/user.module';
import { MailModule } from './mail/mail.module';
import { ProductModule } from './products/product.module';
import { CommentModule } from './comments/comment.module';
import { OrdersModule } from './orders/order.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions, fileUploadOptions, mailOptions, frontendUrlOptions],
      validationSchema: envValidationSchema,
    }),
    MailModule,
    ProductModule,
    CommentModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
