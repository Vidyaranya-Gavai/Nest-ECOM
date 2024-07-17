import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty } from "class-validator";
import { Customer } from "src/customers/schemas/customer.schema";

export class CreateOrderDto{
    @ApiProperty({description: "Array of objects with ProductID and quantity"})
    @IsNotEmpty()
    readonly products: [{id: string, quantity: number}];

    @ApiProperty({description: "Customer who placed the order"})
    @IsEmpty()
    readonly orderedBy: Customer
}