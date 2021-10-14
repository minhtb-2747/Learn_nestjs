import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";

export enum Status {
    INPROCESS = "inprocess",
    SUCCESS = "success",
    CANCEL = "cancel"
}

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.INPROCESS
    })
    status: Status;

    // Trường add thêm cần setDefault tránh null
    @Column({
        default: ""
    })
        
    @Exclude()
    creator: string;

    @ManyToOne(() => User, (user) => user.tasks, { eager: false })
    owner: User

    // owner: string
    // @ManyToMany(() => User)
    // @JoinTable()
    // owners: User[]
}