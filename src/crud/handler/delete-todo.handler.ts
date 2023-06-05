import { TodoService } from './../todo.service';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteManyTodoCommand, DeleteTodoCommand } from "../command/delete-todo.comand";



@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand>{
    constructor(
        private readonly todoService: TodoService
    ){}

    async execute(command: DeleteTodoCommand): Promise<any> {
        return this.todoService.deleteTodo(command?.id);
    }
}


@CommandHandler(DeleteManyTodoCommand)
export class DeleteManyTodoHandler implements ICommandHandler<DeleteManyTodoCommand>{
    constructor(
        private readonly todoService: TodoService
    ){}

    async execute(command: DeleteManyTodoCommand): Promise<any> {
        return this.todoService.deleteManyTodo(command?.id);
    }
}

