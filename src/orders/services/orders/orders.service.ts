import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Admin } from 'src/admin/schemas/admin.schema';
import { Customer } from 'src/customers/schemas/customer.schema';
import { CreateOrderDto } from 'src/orders/dtos/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dtos/update-order.dto';
import { Order } from 'src/orders/schemas/order.schema';
import { Product } from 'src/products/schemas/product.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: mongoose.Model<Order>,
                @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
                @InjectModel(Customer.name) private customerModel: mongoose.Model<Customer>) {}

    async getAllOrders(admin){
        const {username} = admin;
        if(!username) throw new UnauthorizedException('You are not authorized to access this resource');
        return await this.orderModel.find();
    }

    async getOrder(id: string, user){
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException("Provide a valid OrderId");
 
        const order = await this.orderModel.findById(id);
        if(!order) throw new NotFoundException(`Order Not Found - OrderID: ${id}`);
        
        const {email} = user;
        if(email){
            if(order.orderedBy.equals(user._id)) return order;
            else throw new UnauthorizedException(`You are not authorized to get this order - OrderID: ${id}`)
        }

        return order;
    }

    async getMyOrders(loggedInCustomer){
        return await this.orderModel.find({orderedBy: loggedInCustomer._id});
    }

    async getOrdersByCustomerId(id: string, admin){
        const {username} = admin;
        if(!username) throw new UnauthorizedException("You are not authorized to access this resourse");

        if(!mongoose.isValidObjectId(id)) throw new BadRequestException("Provide a valid CustomerID");

        const customer = await this.customerModel.findById(id);
        if(!customer) throw new NotFoundException(`Customer Not Found - CustomerID: ${id}`);

        return await this.orderModel.find({orderedBy: customer._id});
    }

    async addOrder(createOrderDto: CreateOrderDto, customer){
        const newOrder = await this.orderModel.create(createOrderDto);

        var orderCost=0;

        const order = await this.orderModel.findById(newOrder._id);
        await Promise.all(order.products.map(async (product)=>{
            if(!mongoose.isValidObjectId(product.id)) throw new BadRequestException("Enter a valid Product-ID");
            
            const item = await this.productModel.findById(product.id);
            if(!item) throw new NotFoundException(`Product does not exist - ID: ${product.id}`);

            orderCost += item.price*product.quantity;
        }));
        
        return await this.orderModel.findByIdAndUpdate(newOrder._id, {cost: orderCost, orderedBy: customer._id}, {
            new: true
        });
    }

    async updateOrder(id: string, updateOrderDto: UpdateOrderDto, customer){
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException("Provide a valid OrderId");
        
        const orderExists = await this.orderModel.findById(id);
        if(!orderExists) throw new NotFoundException(`Order Not Found - ID: ${id}`);

        if(!orderExists.orderedBy.equals(customer._id)) throw new UnauthorizedException(`You are not authorized to update this order - OrderID: ${id}`)

        if(updateOrderDto.products.length===0) return {
            success: false,
            message: `Nothing to update in the order - OrderID: ${id}`
        }

        const updatedOrder = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true});

        var orderCost=0;
        const order = await this.orderModel.findById(updatedOrder._id);
        await Promise.all(order.products.map(async (product)=>{
            if(!mongoose.isValidObjectId(product.id)) throw new BadRequestException("Enter a valid Product-ID");
            
            const item = await this.productModel.findById(product.id);
            if(!item) throw new NotFoundException(`Product does not exist - ID: ${product.id}`);

            orderCost += item.price*product.quantity;
        }));

        return await this.orderModel.findByIdAndUpdate(updatedOrder._id, {cost: orderCost}, {new: true});
    }

    async deleteOrder(id: string, customer){
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException("Provide a valid OrderId");

        const order = await this.orderModel.findById(id);
        if(!order) throw new NotFoundException(`Order Not Found - ID: ${id}`);

        if(!order.orderedBy.equals(customer._id)) throw new UnauthorizedException(`You are not authorized to delete this order - OrderID: ${id}`);
        
        return await this.orderModel.findByIdAndDelete(id);
    }
}

