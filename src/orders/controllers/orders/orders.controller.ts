import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from 'src/orders/dtos/create-order.dto';
import { OrdersService } from 'src/orders/services/orders/orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService){}

    @Get('')
    async getAllOrders(){
        return await this.orderService.getAllOrders();
    }

    @Get(':id')
    async getOrder(@Param('id') id: string){
        return await this.orderService.getOrder(id);
    }

    @UseGuards(AuthGuard())
    @Post('/add')
    async addOrder(@Body() createOrderDto: CreateOrderDto, @Req() req){
        return this.orderService.addOrder(createOrderDto, req.user);
    }

    @Delete('/delete/:id')
    async deleteOrder(@Param('id') id: string){
        return this.orderService.deleteOrder(id);
    }
}
