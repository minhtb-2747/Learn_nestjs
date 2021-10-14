import { NotFoundException } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { TaskRepository } from './task.respository';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }
    
    // https://typeorm.io/#/repository-api

    async getTasks(query: any, user): Promise<any>{
        try {
            console.log('query ', query, user);
        
            const { name, description, status } = query;

            const builder = this.taskRepository.createQueryBuilder('task');

            builder.where({ owner: user})
            if (name)
                builder.andWhere("task.name LIKE :name", { name: `%${name}%` });
            
            if (description)
                builder.andWhere("task.description LIKE :des", { des: `%${description}%`});

            if (status)
                builder.andWhere("task.status = :status", { status: status })
            
            const tasks = await builder.getMany();
            return tasks;
        } catch (error) {
            console.log('error get all', error);
        }
        
    }


    async getTaskById(id: string, user?: User): Promise<Task> { // hàm trả về promise 
        // const taskFound = await this.taskRepository.findOne(id); // findOne chỉ dựa trên id của task, ai cũng get được
        const taskFound = await this.taskRepository.findOne({where: {id, owner: user}}); // findOne dựa trên id task và check xem người gửi request có phải là owner của công việc hay không
        console.log('taskFound', taskFound);
        if (!taskFound)
            throw new NotFoundException(`task not found`);
        return taskFound;
    }


    async createTask(data: any, user: User): Promise<Task>{
        console.log('data', data);
        const task = await this.taskRepository.create({
            name: data?.name,
            description: data?.description,
            status: data?.status,
            creator: user?.id ? user.id : "",
            owner: user,
        })

        await this.taskRepository.save(task);
        return task;
    }

    async deleteTask(id: string): Promise<void>{
        if (!id) {
            throw new NotFoundException(`id not found`);
        } else {
            const findTask = await this.getTaskById(id);
            console.log('findTask', findTask);
            if (findTask) {
                const deleteTask = await this.taskRepository.delete(id);
                console.log('deleteTask', deleteTask);
                if (!deleteTask)
                    return
            } else {
                throw new NotFoundException(`invalid id: ${id}`)
            }
        }
        
    }

    async editTask(id: string, data: any): Promise<any>{
        if (!id) {
            throw new NotFoundException(`id not found`);
        } else {
            const findTask = await this.taskRepository.findOne(id);
            if (!findTask) {
                throw new NotFoundException(`invalid id: ${id}`)
            } else {
                const task = await this.taskRepository.update({ id: id }, {
                    name: data?.name ? data.name : findTask.name,
                    description: data?.description ? data.description : findTask.name,
                    status: data?.status ? data.status : findTask.status,
                });
                console.log('task', task);
                return task;
            }
        }
    }
}
