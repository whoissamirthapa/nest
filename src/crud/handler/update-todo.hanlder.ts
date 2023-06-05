import { TodoService } from './../todo.service';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { EditTodoCommand, EditTodoCommandProgress } from "../command/update-todo.command";


@CommandHandler(EditTodoCommand)
export class EditTodoHandler implements ICommandHandler<EditTodoCommand>{
    constructor(
        private readonly todoService: TodoService
    ){}

    async execute(command: EditTodoCommand): Promise<any> {
        return this.todoService.editTodo(command?.id, command?.data)
    }
}

@CommandHandler(EditTodoCommandProgress)
export class EditTodoProgressHandler implements ICommandHandler<EditTodoCommandProgress>{
    constructor(
        private readonly todoService: TodoService
    ){}
    execute(command: EditTodoCommandProgress): Promise<any> {
        console.log("handler")
        return this.todoService.editTodoProgress(command?.id, command?.data)
    }
    
}