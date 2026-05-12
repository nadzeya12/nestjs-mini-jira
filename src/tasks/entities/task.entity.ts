import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { projectEntity } from "../../projects/entities/project.entity";

export enum taskStatus {
TO_DO = 'to_do',
IN_PROGRESS = 'in_progress',
DONE = 'done'
}


@Entity({ name: 'tasks'})
export class tasksEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    title!: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({
        type: 'enum',
        enum: taskStatus
    })
    @Column({name: 'userId'})
    projectId!: string;

    @ManyToOne(() => projectEntity, (project) => project.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'projectId'})
    projects!: projectEntity[];
}

