import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Customer } from "./schemas/customer.schema";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: { id: any }){
        const {id} = payload;

        const customer = await this.customerModel.findById(id);
        if(!customer) throw new UnauthorizedException('Unauthorized Access Detected');
        return customer;
    }
}