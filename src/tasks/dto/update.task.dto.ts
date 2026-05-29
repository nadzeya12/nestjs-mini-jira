import { IsEnum, IsOptional, IsString, Matches, MinLength } from "class-validator"
import { taskStatus } from "../entities/task.entity"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class updateTaskDto {
@ApiPropertyOptional({
    description: `Task's title`,
    example: 'Title',
    type: String
})
@IsOptional()
@IsString()
@MinLength(4)
@Matches(/^(?!\s*$).+/)
title?: string

@ApiPropertyOptional({
    description: `Task's description`,
    example: 'This is my first task',
    type: String
})
@IsOptional()
@IsString()
description?: string

@ApiPropertyOptional({
    description: `Task's status`,
    example: 'to_do',
    type: String
})
@IsOptional()
@IsEnum(taskStatus)
status?: string
}