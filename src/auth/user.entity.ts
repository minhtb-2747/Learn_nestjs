
import { Task } from '../module/tasks/tasks.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Exclude()
    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.owner, { eager: true })
    @Exclude({toPlainOnly: true})
    tasks: Task[]
}