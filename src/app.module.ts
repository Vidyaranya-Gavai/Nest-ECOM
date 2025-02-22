import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    OrdersModule,
    CustomersModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
