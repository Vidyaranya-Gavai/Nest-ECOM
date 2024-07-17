import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCustomerDto } from 'src/customers/dtos/create-customer.dto';
import { Customer } from 'src/customers/schemas/customer.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/customers/dtos/login.dto';
import { Order } from 'src/orders/schemas/order.schema';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        @InjectModel(Order.name) private orderModel: Model<Order>,
        private jwtService: JwtService
    ){}

    async getAllCustomers() {
        return await this.customerModel.find();
    }

    async getCustomer(id: string){
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException("Provide a valid CustomerId");
        const customer = await this.customerModel.findById(id);
        if(!customer) throw new NotFoundException(`Customer Not Found - ID: ${id}`);
        return customer;
    }

    async signUp(createCustomerDto: CreateCustomerDto){
        const {name, email, password} = createCustomerDto;

        const customerExists = await this.customerModel.findOne({email});
        if(customerExists) throw new ConflictException("Customer already exists, try logging in");
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await this.customerModel.create({name, email, password: hashedPassword});
        const token = this.jwtService.sign({id: customer._id, name: customer.name});

        return {token};
    }

    async login(loginDto: LoginDto){
        const {email, password} = loginDto;

        const customer = await this.customerModel.findOne({email});
        if(!customer) throw new BadRequestException("Invalid Credentials");

        const isCorrectPassword = bcrypt.compare(password, customer.password);
        if(!isCorrectPassword) throw new BadRequestException("Invalid Credentials");

        const token = this.jwtService.sign({id: customer._id, name: customer.name});
        return {token};
    }

    async deleteCustomer(id: string, admin){
        const {username} = admin;
        if(!username) throw new UnauthorizedException("You are not authorized to access this resourse");

        if(!mongoose.isValidObjectId(id)) throw new BadRequestException("Provide a valid CustomerId");

        const customer = await this.customerModel.findByIdAndDelete(id);
        if(!customer) throw new NotFoundException(`Customer Not Found - ID: ${id}`);

        await this.orderModel.deleteMany({orderedBy: customer._id});
        return {
            success: true,
            message: `Customer Deleted Successfully - ID: ${id}`
        };
    }
}
