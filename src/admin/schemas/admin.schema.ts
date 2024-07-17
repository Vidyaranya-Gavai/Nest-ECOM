import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Admin{
    @Prop()
    username: string;

    @Prop()
    password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);