import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Customer } from "./schemas/customer.schema";
import { Model } from "mongoose";
import { Admin } from "src/admin/schemas/admin.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        @InjectModel(Admin.name) private adminModel: Model<Admin>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: { id: any }){
        const {id} = payload;

        const customer = await this.customerModel.findById(id);
        if(customer) return customer;

        const admin = await this.adminModel.findById(id);
        if(admin) return admin;

        throw new UnauthorizedException('Unauthorized Access Detected - CustomerJWT');
    }
}