import { Controller, Get, Param, Body, Post, Delete, Patch, Query, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private readonly taskService: TasksService) { }
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    // Get all Task
    getTasks(@Query() query: any, @Req() req: any): Promise<Task>{
        const { user } = req;
        return this.taskService.getTasks(query, user);
    }

    @Get("/:id")
    // Get Task by Id
    getTaskById(@Param() param: any, @Req() req: any): Promise<Task> {
        const { user } = req;
        console.log('param', param)
        return this.taskService.getTaskById(param?.id, user);
    }

    @Post()
    // Create Task
    createTask(@Body() data: Task, @Req() req: any): Promise<Task>{
        const { user } = req;
        console.log('user', user.id);
        return this.taskService.createTask(data, user);
    }

    @Delete("/:id")
    //Delete Task by Id
    deleteTask(@Param('id') id: string): Promise<void>{
        return this.taskService.deleteTask(id);
    }


    @Patch("/:id")
    // Edit task
    editTask(@Param('id') id: string , @Body() data: Task): Promise<Task>{
        return this.taskService.editTask(id, data);
    }
}
