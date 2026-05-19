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
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))

    description!: string;
}