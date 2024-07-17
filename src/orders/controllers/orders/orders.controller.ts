import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/orders/dtos/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dtos/update-order.dto';
import { OrdersService } from 'src/orders/services/orders/orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService){}

    @UseGuards(AuthGuard())
    @Get('')
    async getAllOrders(@Req() req){
        return await this.orderService.getAllOrders(req.user);
    }

    @UseGuards(AuthGuard())
    @Get('/myOrders')
    async getMyOrders(@Req() req){
        return await this.orderService.getMyOrders(req.user);
    }

    @ApiParam({name: 'id', required: true, description: "OrderID (MongoDB ObjectID)"})
    @UseGuards(AuthGuard())
    @Get(':id')
    async getOrder(@Param('id') id: string, @Req() req){
        return await this.orderService.getOrder(id, req.user);
    }

    @ApiParam({name: 'id', required: true, description: "CustomerID (MongoDB ObjectID)"})
    @UseGuards(AuthGuard())
    @Get('/customerOrders/:id')
    async getOrdersByCustomerId(@Param('id') id: string, @Req() req){
        return await this.orderService.getOrdersByCustomerId(id, req.user);
    }

    @UseGuards(AuthGuard())
    @Post('/add')
    async addOrder(@Body() createOrderDto: CreateOrderDto, @Req() req){
        return this.orderService.addOrder(createOrderDto, req.user);
    }

    @ApiParam({name: 'id', required: true, description: "OrderID (MongoDB ObjectID)"})
    @UseGuards(AuthGuard())
    @Put('/update/:id')
    async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Req() req){
        return this.orderService.updateOrder(id, updateOrderDto, req.user);
    }

    @ApiParam({name: 'id', required: true, description: "OrderID (MongoDB ObjectID)"})
    @UseGuards(AuthGuard())
    @Delete('/delete/:id')
    async deleteOrder(@Param('id') id: string, @Req() req){
        return this.orderService.deleteOrder(id, req.user);
    }
}
