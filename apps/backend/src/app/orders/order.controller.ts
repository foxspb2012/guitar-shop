import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, JwtAuthGuard, Roles, RolesGuard } from '@guitar-shop/core';
import { UserRole } from '@guitar-shop/shared-types';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { OrderRdo } from './rto/order.rdo';
import { IndexQuery } from './query/order.query.decorator';
import { OrderQuery } from './query/order.query';
import { DetailedOrderRdo } from './rto/detailed-order.rdo';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for creating a product', type: OrderRdo })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request format' })
  public async create(@Body() dto: CreateOrderDto, @Req() req: Request) {
    const newOrder = await this.orderService.createOrder(dto, req.user);
    return fillObject(OrderRdo, newOrder);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Admin}`)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiParam({ name: "id", required: true, description: "Order unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting a order' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Resource for admins only', })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not fount', })
  async destroy(@Param('id') id: number) {
    await this.orderService.deleteOrder(id);
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Admin}`)
  @IndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a list of products', type: OrderRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Products not fount', })
  async index(@Query() query: OrderQuery) {
    const orders = await this.orderService.getOrders(query);
    return fillObject(OrderRdo, orders);
  }

  @Get('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Admin}`)
  @ApiParam({ name: "id", required: true, description: "Product unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting detailed information about the product', type: DetailedOrderRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not fount', })
  async show(@Param('id') id: number) {
    const order = await this.orderService.getOrder(id);
    return fillObject(DetailedOrderRdo, order);
  }
}
