import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersService } from './services/orders/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { ProductSchema } from 'src/products/schemas/product.schema';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Order', schema: OrderSchema}, {name: 'Product', schema: ProductSchema}]),
    CustomersModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
