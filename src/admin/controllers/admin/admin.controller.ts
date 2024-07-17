import { Body, Controller, Post } from '@nestjs/common';
import { AdminLoginDto } from 'src/admin/dtos/admin-login.dto';
import { AdminService } from 'src/admin/services/admin/admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Post('/login')
    async loginAdmin(@Body() adminLoginDto: AdminLoginDto){
        return await this.adminService.adminLogin(adminLoginDto);
    }
}
