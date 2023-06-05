import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoCommand } from "../command/create-todo.command";
import { TodoService } from "../todo.service";


@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand>{
    constructor(
        private readonly todoService: TodoService
    ){}
    async execute(command: CreateTodoCommand): Promise<any> {
        // console.log(command);
        return this.todoService.createTodo(command?.title, command?.description, command?.author)
    }
}