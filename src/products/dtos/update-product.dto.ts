import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../schemas/product.schema";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateProductDto{
    @ApiProperty({description: "Product Name"})
    @IsOptional()
    @IsString()
    readonly name: string;

    @ApiProperty({description: "Product Description"})
    @IsOptional()
    @IsString()
    readonly description: string;

    @ApiProperty({description: "Product Price"})
    @IsOptional()
    @IsNumber()
    readonly price: number;

    @ApiProperty({description: "Product Category"})
    @IsOptional()
    @IsEnum(Category, {message: "Enter a valid category"})
    readonly category: Category;
}