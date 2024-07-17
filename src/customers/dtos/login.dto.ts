import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto{
    @ApiProperty({description: "Customer Email"})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({description: "Customer Password"})
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}