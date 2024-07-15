import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/create-customer.dto';
import { LoginDto } from 'src/customers/dtos/login.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService){}

    @Get('/')
    async getAllCustomers(){
        return await this.customerService.getAllCustomers();
    }

    @Get('/:id')
    async getCustomer(@Param('id') id: string){
        return await this.customerService.getCustomer(id);
    }

    @Post('/signup')
    async signUp(@Body() createCustomerDto: CreateCustomerDto){
        return await this.customerService.signUp(createCustomerDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto){
        return await this.customerService.login(loginDto);
    }
}
