import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Customer extends Document{
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);