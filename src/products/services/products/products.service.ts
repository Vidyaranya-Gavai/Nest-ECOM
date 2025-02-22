import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateProductDto } from 'src/products/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto';
import { Product } from 'src/products/schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: mongoose.Model<Product>){}

    async getAllProducts(){
        return await this.productModel.find();
    }

    async getProductById(id: string){
        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Provide a valid ID');
        
        const product = await this.productModel.findById(id);
        if(!product) throw new NotFoundException(`Product Not Found - ID: ${id}`);

        return product;
    }

    async addProduct(createProductDto: CreateProductDto, admin){
        const {username} = admin;
        if(!username) throw new UnauthorizedException("You are authorized to add a new product");
        return await this.productModel.create(createProductDto);
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto, admin){
        const {username} = admin;
        if(!username) throw new UnauthorizedException("You are authorized to add a new product");

        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Provide a valid ID');

        const product = await this.productModel.findById(id);
        if(!product) throw new NotFoundException('Product not found');

        return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
            new: true
        });
    }

    async deleteProduct(id: string, admin){
        const {username} = admin;
        if(!username) throw new UnauthorizedException("You are authorized to add a new product");

        if(!mongoose.isValidObjectId(id)) throw new BadRequestException('Provide a valid ID');

        const product = await this.productModel.findById(id);
        if(!product) throw new NotFoundException('Product not found');

        return await this.productModel.findByIdAndDelete(id);
    }
}
