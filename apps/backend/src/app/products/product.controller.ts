import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { fillObject, getMulterOptions, JwtAuthGuard, Roles, RolesGuard } from '@guitar-shop/core';
import { UserRole } from '@guitar-shop/shared-types';
import { IndexQuery } from './query/product.query.decorator';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DetailedProductRdo } from './rto/detailed-product.rdo';
import { ProductQuery } from './query/product.query';
import { ProductRdo } from './rto/product.rdo';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @Post('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Admin}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for creating a product', type: ProductRdo })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Resource for admins only' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request format' })
  public async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.productService.createProduct(dto);
    return fillObject(ProductRdo, newProduct);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Admin}`)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiParam({ name: "id", required: true, description: "Product unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for updating a product', type: ProductRdo })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Resource for admins only', })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request format', })
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    const updatedComment = await this.productService.updateProduct(id, dto);
    return fillObject(ProductRdo, updatedComment);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Admin}`)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiParam({ name: "id", required: true, description: "Product unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting a product' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Resource for admins only', })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not fount', })
  async destroy(@Param('id') id: number) {
    await this.productService.deleteProduct(id);
  }

  @Get('/')
  @IndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a list of products', type: ProductRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Products not fount', })
  async index(@Query() query: ProductQuery) {
    const products = await this.productService.getProducts(query);
    return fillObject(ProductRdo, products);
  }

  @Get('/:id')
  @ApiParam({ name: "id", required: true, description: "Product unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting detailed information about the product', type: DetailedProductRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not fount', })
  async show(@Param('id') id: number) {
    const existProduct = await this.productService.getProduct(id);
    return fillObject(DetailedProductRdo, existProduct);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Admin}`)
  @UseInterceptors(FileInterceptor('photo', getMulterOptions()))
  @Post('/:id/photo')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", required: true, description: "Product unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for uploading product photos', type: ProductRdo })
  public async upload(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    const updatedComment = await this.productService.updateProduct(id, { photo: file.filename });
    return fillObject(ProductRdo, updatedComment);
  }

  @Get('/:id/photo')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", required: true, description: "Product unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for downloading product photos', type: ProductRdo })
  public async read(@Param('id') id: number, @Res() res: Response) {
    const filePath = await this.productService.getProductPhoto(id);
    return res.sendFile(filePath);
  }
}
