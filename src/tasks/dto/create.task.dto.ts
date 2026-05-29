import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { taskStatus } from "../entities/task.entity"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateTaskDto {
    @ApiProperty({
        description: `Task's title`,
        example: 'First task',
        type: String
    })
@IsNotEmpty()
@IsString()
@MinLength(4)
@Matches(/^(?!\s*$).+/)

title!: string

@ApiPropertyOptional({
    description: `Task's description`,
    example: 'This ismy first task',
    type: String
})
@IsOptional()
@MinLength(5)
@MaxLength(30)

description!: string

@ApiProperty({
    description: `Task's status`,
    example: 'to_do',
    type: String
})
@IsNotEmpty()
@IsEnum(taskStatus)
status!: string

@ApiProperty({
    description: `ProjectId`,
    example: 'fa74839173667ef9f6s55su7f14',
    type: String
})
@IsNotEmpty({ message: 'Project id nie może być pustym'})
@IsString()
projectId!: string
}