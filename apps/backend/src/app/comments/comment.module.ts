import { Module, Logger } from '@nestjs/common';
import { ProductModule } from '../products/product.module';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [ProductModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, Logger],
})
export class CommentModule { }
