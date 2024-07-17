import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Admin } from "./schemas/admin.schema";
import { Model } from "mongoose";
import { Customer } from "src/customers/schemas/customer.schema";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
        @InjectModel(Customer.name) private customerModel: Model<Customer>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: { id: any }){
        const {id} = payload;

        const admin = await this.adminModel.findById(id);
        if(admin) return admin;

        const customer = await this.customerModel.findById(id);
        if(customer) return customer;

        throw new UnauthorizedException('Unauthorized Access Detected');
    }
}