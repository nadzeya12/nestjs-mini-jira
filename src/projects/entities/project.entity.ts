// import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn, OneToMany } from "typeorm";
// import { userEntity } from "../../users/entities/user.entity";
// import { tasksEntity } from "../../tasks/entities/task.entity";

// @Entity({ name: 'projects'})
// export class projectEntity {
//     @PrimaryColumn() 
//     id!: string;

//     @Column({
//         type: 'text',
//         nullable: false,
//         unique: true
//     })
//     title!: string;

//     @Column({
//         type: 'text',
//         nullable: true
//     })
//     description!: string;

//     @Column({ name: 'userId'})
//     userId!: string;

//     @ManyToOne(() => userEntity, (user) => user.id, { onDelete: 'CASCADE'})
//     @JoinColumn({ name: 'userId'})
//     user!: userEntity;

//     @CreateDateColumn({
//         type: 'date'
//     })
//     createdAt!: Date;

//     @OneToMany(() => tasksEntity, (task) => task.projects)
//     tasks!: tasksEntity;
// }