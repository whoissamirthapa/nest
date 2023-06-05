import  { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from '../command/create-todo.command';
import { GetTodoCompletedQuery, GetTodoOnlyQuery, GetTodoPaginationQuery, GetTodoProgressQuery, GetTodoQuery } from '../queries/get-todo.query';
import { TodoService } from '../todo.service';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery>{

    constructor(
        private readonly todoService: TodoService
    ){}
    async execute(query: GetTodoQuery): Promise<any> {
        return this.todoService.getTodoAll();
    }
}

@QueryHandler(GetTodoPaginationQuery)
export class GetTodoPaginationHandler implements IQueryHandler<GetTodoPaginationQuery>{

    constructor(
        private readonly todoService: TodoService
    ){}
    async execute(query: GetTodoPaginationQuery): Promise<any> {
        // console.log(" get todo pagination handler", query);
        return this.todoService.getTodoPagination(query?.page_number);
    }
}

@QueryHandler(GetTodoOnlyQuery)
export class GetTodoOnlyHandler implements IQueryHandler<GetTodoOnlyQuery>{

    constructor(
        private readonly todoService: TodoService
    ){}
    async execute(query: GetTodoOnlyQuery): Promise<any> {
        // console.log(" get todo pagination handler", query);
        return this.todoService.getTodoOnly(query?.page_number);
    }
}

@QueryHandler(GetTodoProgressQuery)
export class GetTodoProgressHandler implements IQueryHandler<GetTodoProgressQuery>{

    constructor(
        private readonly todoService: TodoService
    ){}
    async execute(query: GetTodoProgressQuery): Promise<any> {
        // console.log(" get todo pagination handler", query);
        return this.todoService.getTodoProgress(query?.page_number);
    }
}

@QueryHandler(GetTodoCompletedQuery)
export class GetTodoCompletedHandler implements IQueryHandler<GetTodoCompletedQuery>{

    constructor(
        private readonly todoService: TodoService
    ){}
    async execute(query: GetTodoCompletedQuery): Promise<any> {
        // console.log(" get todo pagination handler", query);
        return this.todoService.getTodoCompleted(query?.page_number);
    }
}


