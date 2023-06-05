import { Controller, Post, Body, Get, Param, Delete, Put, Req } from '@nestjs/common'
import { CommandBus, QueryBus} from '@nestjs/cqrs';
import { CreateTodoCommand } from './command/create-todo.command';
import { GetTodoCompletedQuery, GetTodoOnlyQuery, GetTodoPaginationQuery, GetTodoProgressQuery, GetTodoQuery } from './queries/get-todo.query';
import { DeleteManyTodoCommand, DeleteTodoCommand } from './command/delete-todo.comand';
import { EditTodoCommand, EditTodoCommandProgress } from './command/update-todo.command';
import { Request } from 'express';

@Controller("todo")
export class TodoController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ){}
    
    @Post()
    async createTodo(@Body() body: any){
        // console.log(body)
        return this.commandBus.execute(new CreateTodoCommand(body?.title, body?.description, body?.author));
    }

    @Get()
    async getTodos(){
        return this.queryBus.execute(new GetTodoQuery());
    }

    @Get(':id')
    async getTodoPagination(@Param("id") page_number: number){
        return this.queryBus.execute(new GetTodoPaginationQuery(page_number))
    }

    @Delete(":id")
    async deleteTodo(@Param("id") id: number){
        return this.commandBus.execute(new DeleteTodoCommand(id));
    }

    
    @Put("progress")
    async updateProgress(@Body() body: any){
        // console.log("controller",body);
        return this.commandBus.execute(new EditTodoCommandProgress(body?.id, body?.data))
    }

    @Put(":id")
    async updateTodo(@Param("id") id:number, @Body() body: any){
        return this.commandBus.execute(new EditTodoCommand(id, 
            { 
                title: body?.title, 
                description: body?.description, 
                author: body?.author,
                progress: body?.progress
            }
        ))
    }

    @Get("/todo-only/:id")
    async getOnlyTodo(@Param("id") page_number: number){
        return this.queryBus.execute(new GetTodoOnlyQuery(page_number))
    }

    @Get("/todo-progress/:id")
    async getTodoProgress(@Param("id") page_number: number){
        return this.queryBus.execute(new GetTodoProgressQuery(page_number))
    }

    @Get("/todo-completed/:id")
    async getTodoCompleted(@Param("id") page_number: number){
        return this.queryBus.execute(new GetTodoCompletedQuery(page_number))
    }

    @Post("delete")
    async deleteManyTodo(@Body() body: any){
        console.log("controller many todo delete ", body);
        return this.commandBus.execute(new DeleteManyTodoCommand(body?.id));
    }

}