import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}