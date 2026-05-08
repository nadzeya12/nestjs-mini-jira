import { IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;
}