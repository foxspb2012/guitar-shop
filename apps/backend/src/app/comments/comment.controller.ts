import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, JwtAuthGuard, Roles, RolesGuard } from '@guitar-shop/core';
import { UserRole } from '@guitar-shop/shared-types';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rto/comment.rdo';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) { }

  @Post('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Admin}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for creating a comment', type: CommentRdo })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Resource for admins only' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request format' })
  public async create(@Body() dto: CreateCommentDto) {
    const newProduct = await this.commentService.createComment(dto);
    return fillObject(CommentRdo, newProduct);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", required: true, description: "Product unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a list of comments', type: CommentRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Comments not fount', })
  async index(@Param('id') id: number) {
    const products = await this.commentService.getComments(id);
    return fillObject(CommentRdo, products);
  }
}
