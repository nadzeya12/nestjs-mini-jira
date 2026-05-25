<<<<<<< HEAD
import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
=======
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627
import { taskStatus } from "../entities/task.entity"

export class CreateTaskDto {
@IsNotEmpty()
@IsString()
<<<<<<< HEAD
@MinLength(4)
@Matches(/^(?!\s*$).+/)
title!: string

@IsString()
@IsOptional()
@Matches(/^$|^(?!\s+$).+/) 
=======
title!: string

@IsOptional()
@MinLength(5)
@MaxLength(30)
>>>>>>> 92afc2c3f060577a416ea46a8cf97ea46c505627
description!: string

@IsNotEmpty()
@IsEnum(taskStatus)
status!: string

@IsNotEmpty()
@IsString()
projectId!: string
}