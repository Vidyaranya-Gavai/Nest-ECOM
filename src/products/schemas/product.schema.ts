import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Category{
    FURNITURE = "Furniture",
    ELECTRONICS = "Electronics",
    CLOTHING = "Clothing",
    BOOK = "Book",
    OTHERS = "Others"
}

@Schema({timestamps: true})
export class Product extends Document{
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    category: Category
}

export const ProductSchema = SchemaFactory.createForClass(Product);