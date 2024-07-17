import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AdminLoginDto{
    @ApiProperty({description: "Admin Username"})
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({description: "Admin Password"})
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}