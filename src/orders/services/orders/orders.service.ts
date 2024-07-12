import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateOrderDto } from 'src/orders/dtos/create-order.dto';
import { Order } from 'src/orders/schemas/order.schema';
import { Product } from 'src/products/schemas/product.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: mongoose.Model<Order>,
                @InjectModel(Product.name) private productModel: mongoose.Model<Product>){}

    async getAllOrders(){
        return await this.orderModel.find();
    }

    async getOrder(id: string){
        const order = await this.orderModel.findById(id);
        if(!order) throw new NotFoundException(`Order Not Found - ID: ${id}`);
        return order;
    }

    async addOrder(createOrderDto: CreateOrderDto){
        const newOrder = await this.orderModel.create(createOrderDto);

        var orderCost=0;

        const order = await this.orderModel.findById(newOrder._id);
        await Promise.all(order.products.map(async (product)=>{
            if(!mongoose.isValidObjectId(product.id)) throw new BadRequestException("Enter a valid Product-ID");
            
            const item = await this.productModel.findById(product.id);
            if(!item) throw new NotFoundException(`Product does not exist - ID: ${product.id}`);

            orderCost += item.price*product.quantity;
        }));
        
        return await this.orderModel.findByIdAndUpdate(newOrder._id, {cost: orderCost}, {
            new: true
        });
    }

    async deleteOrder(id: string){
        const order = await this.orderModel.findById(id);
        if(!order) throw new NotFoundException(`Order Not Found - ID: ${id}`);

        return await this.orderModel.findByIdAndDelete(id);
    }
}

