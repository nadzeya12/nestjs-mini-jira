import { IsEmail, IsString, IsUUID } from "class-validator"
import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

export class signUpDto {
    @IsEmail()
    email!: string

    @IsString()
    password!: string

    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    @IsString()
    id!: string
}

export class loginDto {
    @IsEmail()
    email!: string

    @IsString()
    password!: string

    @PrimaryColumn('uuid')
    @IsUUID()
    @IsString()
    userId!: string
}