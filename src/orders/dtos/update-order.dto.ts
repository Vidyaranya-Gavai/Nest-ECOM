import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class UpdateOrderDto{
    @ApiProperty({description: "Array of objects with ProductID and quantity"})
    @IsArray()
    readonly products: [{id: string, quantity: number}] | [];
}