import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

    @Post('/add')
    async addOrder(@Body() createOrderDto: CreateOrderDto){
        return this.orderService.addOrder(createOrderDto);
    }

    @Delete('/delete/:id')
    async deleteOrder(@Param('id') id: string){
        return this.orderService.deleteOrder(id);
    }
}
