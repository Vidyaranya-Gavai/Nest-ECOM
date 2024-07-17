import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { OrderSchema } from 'src/orders/schemas/order.schema';
import { AdminSchema } from 'src/admin/schemas/admin.schema';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Customer', schema: CustomerSchema},
      {name: 'Order', schema: OrderSchema},
      {name: 'Admin', schema: AdminSchema}
    ]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string | number>('JWT_EXPIRE'),
          }
        }
      }
    }),
    AdminModule
  ],
  controllers: [CustomersController],
  providers: [CustomersService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class CustomersModule {}
