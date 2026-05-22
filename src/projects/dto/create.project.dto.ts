import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { Column } from "typeorm";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @Matches(/^(?!\s*$).+/)

    title!: string;
    
    @IsString()
    @IsOptional()
    @Matches(/^$|^(?!\s+$).+/) 

    description!: string;
}