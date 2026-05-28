import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsUUID, Min, MinLength } from "class-validator"
import { PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm"

export class signUpDto {
    @ApiProperty({
        description: `User's email for sign Up`,
        example: 'abcd11@gmail.com',
        type: String
    })
    @IsNotEmpty({ message: 'email must be not empty' })
    @IsEmail()
    @MinLength(8)
    email!: string

    @ApiProperty({
        description: `User's passowrd`,
        example: '12341234qazxsw',
        type: String
    })
    @IsString()
    @IsNotEmpty({ message: 'password must be not empty' })
    password!: string
}

export class loginDto {
    @ApiProperty({
        description: `User's email for sign Up`,
        example: 'abcd11@gmail.com',
        type: String
    })
    @IsEmail()
    @IsNotEmpty({ message: 'Email must not be empty' })
    email!: string

    @ApiProperty({
        description: `User's passowrd`,
        example: '12341234qazxsw',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    password!: string
}