import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/product.schema";
import { ApiProperty } from "@nestjs/swagger";


export class CreateProductDto{
    @ApiProperty({description: "Product Name"})
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({description: "Product Description"})
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({description: "Product Price"})
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @ApiProperty({description: "Product Category"})
    @IsNotEmpty()
    @IsEnum(Category, {message: "Enter a valid category"})
    readonly category: Category;
}