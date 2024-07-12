export class CreateOrderDto{
    readonly products: [{id: string, quantity: number}];
}