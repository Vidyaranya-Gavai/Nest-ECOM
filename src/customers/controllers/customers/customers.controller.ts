import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam } from '@nestjs/swagger';
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

    @ApiParam({name: 'id', required: true, description: "CustomerID (MongoDB ObjectID)"})
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

    @ApiParam({name: 'id', required: true, description: "CustomerID (MongoDB ObjectID)"})
    @UseGuards(AuthGuard())
    @Delete('/delete/:id')
    async deleteCustomer(@Param('id') id: string, @Req() req){
        return await this.customerService.deleteCustomer(id, req);
    }
}
