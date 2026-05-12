import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
@Entity({ name: 'users'})
export class userEntity {
    @PrimaryColumn('uuid')  
    id!: string;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false,
        length: 255
    })
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;
}