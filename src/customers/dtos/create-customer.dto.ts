import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCustomerDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string;
}