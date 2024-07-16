import { IsArray } from "class-validator";

export class UpdateOrderDto{
    @IsArray()
    readonly products: [{id: string, quantity: number}] | [];
}