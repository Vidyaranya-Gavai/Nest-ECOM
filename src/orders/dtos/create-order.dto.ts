import { IsEmpty, IsNotEmpty } from "class-validator";
import { Customer } from "src/customers/schemas/customer.schema";

export class CreateOrderDto{
    @IsNotEmpty()
    readonly products: [{id: string, quantity: number}];

    @IsEmpty()
    readonly orderedBy: Customer
}