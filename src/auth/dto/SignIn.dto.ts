import { IsEmail, IsNotEmpty, IsString, IsUUID, Min, MinLength } from "class-validator"
import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

export class signUpDto {
    @IsNotEmpty({ message: 'email must be not empty' })
    @IsEmail()
    @MinLength(8)
    email!: string

    @IsString()
    @IsNotEmpty({ message: 'password must be not empty' })
    password!: string
}

export class loginDto {
    @IsEmail()
    email!: string

    @IsString()
    password!: string
}