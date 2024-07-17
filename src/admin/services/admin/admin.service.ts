import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from 'src/admin/dtos/admin-login.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
        private jwtService: JwtService
    ){}

    async adminLogin(adminLoginDto: AdminLoginDto){
        const {username, password} = adminLoginDto;
        
        const admin = await this.adminModel.findOne({username});
        if(!admin) throw new BadRequestException("Invalid Credentials");

        const isCorrectPassword = await bcrypt.compare(password, admin.password);
        if(!isCorrectPassword) throw new BadRequestException("Invalid Credentials");

        const token = this.jwtService.sign({id: admin._id});
        return {token};
    }
}
