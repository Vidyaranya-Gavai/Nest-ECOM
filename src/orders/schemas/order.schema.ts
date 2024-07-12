import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Product } from "src/products/schemas/product.schema";
import { v4 as uuidv4} from 'uuid';

@Schema({timestamps: true})
export class Order extends Document{
    @Prop({unique: true, default: () => `ON-${uuidv4().slice(0,13).toUpperCase()}`})
    orderNumber: string;

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Product' }] })
    products: [{id: Product, quantity: number}]

    @Prop()
    cost: number
}

export const OrderSchema = SchemaFactory.createForClass(Order);