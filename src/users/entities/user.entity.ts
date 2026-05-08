import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class userEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;
}