import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto{
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}