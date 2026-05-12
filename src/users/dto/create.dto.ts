import { IsEmail, isEmail, IsHash, IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string
    //isHash() -from 'class-validator'
    password!: string

    @IsUUID()
    id!: string
}