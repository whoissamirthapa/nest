import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoHandler } from './handler/create-todo.handler';
import { 
    GetTodoCompletedHandler, 
    GetTodoHandler, 
    GetTodoOnlyHandler, 
    GetTodoPaginationHandler, 
    GetTodoProgressHandler 
} from './handler/get-todo.handler';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './crud.schema';
import { DeleteManyTodoHandler, DeleteTodoHandler } from './handler/delete-todo.handler';
import { EditTodoHandler, EditTodoProgressHandler } from './handler/update-todo.hanlder';

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema}])
    ],
    controllers: [TodoController],
    providers: [
        TodoService,
        CreateTodoHandler,
        GetTodoHandler,
        GetTodoPaginationHandler,
        DeleteTodoHandler,
        EditTodoHandler,
        EditTodoProgressHandler,
        GetTodoOnlyHandler,
        GetTodoProgressHandler,
        GetTodoCompletedHandler,
        DeleteManyTodoHandler
    ]
})

export class TodoModule{}