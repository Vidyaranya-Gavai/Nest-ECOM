import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCustomerDto{
    @ApiProperty({description: "Customer Name"})
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly name: string;

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