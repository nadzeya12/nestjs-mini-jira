import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { taskStatus } from "../entities/task.entity"

export class CreateTaskDto {
@IsNotEmpty()
@IsString()
@MinLength(4)
@Matches(/^(?!\s*$).+/)

title!: string

@IsOptional()
@MinLength(5)
@MaxLength(30)

description!: string

@IsNotEmpty()
@IsEnum(taskStatus)
status!: string

@IsNotEmpty({ message: 'Project id nie może być pustym'})
@IsString()
projectId!: string
}