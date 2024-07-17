import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from 'src/products/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto';
import { Product } from 'src/products/schemas/product.schema';
import { ProductsService } from 'src/products/services/products/products.service';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}

    @Get('')
    async getAllProducts(): Promise<Product[]>{
        return await this.productService.getAllProducts();
    }

    @Get('/:id')
    async getProductById(@Param('id') id: string): Promise<Product>{
        return await this.productService.getProductById(id);
    }

    @UseGuards(AuthGuard())
    @Post('/add')
    async addProduct(@Body() createProductDto: CreateProductDto, @Req() req){
        return await this.productService.addProduct(createProductDto, req.user);
    }

    @UseGuards(AuthGuard())
    @Put('/update/:id')
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req){
        return await this.productService.updateProduct(id, updateProductDto, req.user);
    }

    @UseGuards(AuthGuard())
    @Delete('/delete/:id')
    async deleteProduct(@Param('id') id: string, @Req() req){
        return await this.productService.deleteProduct(id, req.user);
    }
}
