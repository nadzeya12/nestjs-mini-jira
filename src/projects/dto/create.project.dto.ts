import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateProjectDto {
@ApiProperty({
    description: `Project's title`,
    example: 'First project',
    type: String
})
@IsNotEmpty()
@IsString()
@MinLength(5)
@Matches(/^(?!\s*$).+/)
title!: string;

@ApiPropertyOptional({
    description: `Project's description`,
    example: 'This is a project for my plans',
    type: String
})
@IsString()
@IsOptional()
@Matches(/^$|^(?!\s+$).+/) 
description!: string;
}