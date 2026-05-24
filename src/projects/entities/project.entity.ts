import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { userEntity } from "../../users/entities/user.entity";
import { IsUUID } from "class-validator";
import { tasksEntity } from "../../tasks/entities/task.entity";

@Entity({ name: 'projects'})
export class projectEntity {
    @PrimaryColumn() 
    id!: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: true
    })
    title!: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description!: string;

    @Column({ name: 'userId'})
    @IsUUID()
    userId!: string;

    @ManyToOne(() => userEntity, (user) => user.id, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId'})
    user!: userEntity;

    @CreateDateColumn({
        type: 'date'
    })
    createdAt!: Date;
    
    tasks!: tasksEntity[];
}