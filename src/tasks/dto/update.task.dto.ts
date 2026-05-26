import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { taskStatus } from "../entities/task.entity"

export class updateTaskDto {
@IsOptional()
@IsString()
@MinLength(4)
@Matches(/^(?!\s*$).+/)
title?: string

@IsOptional()
description?: string

@IsOptional()
@IsEnum(taskStatus)
status?: string

@IsOptional()
@IsString()
projectId?: string
}