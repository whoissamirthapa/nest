import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AddAuthCommand, LoginAuthCommand } from "../commands/add-command";
import { AuthService } from "../auth.service";
import { GetUsersQuery } from "../queries/getusers-query";



@CommandHandler(AddAuthCommand)
export class AddAuthHandler implements ICommandHandler<AddAuthCommand>{
    constructor(
        private readonly authService: AuthService
    ){}
    async execute(command: AddAuthCommand): Promise<any> {
        return this.authService.addAuth(command?.data)
    }
}

@CommandHandler(LoginAuthCommand)
export class LoginAuthHandler implements ICommandHandler<LoginAuthCommand>{
    constructor(
        private readonly authService: AuthService
    ){}
    async execute(command: LoginAuthCommand): Promise<any> {
        return this.authService.loginAuth(command?.data)
    }
}

@QueryHandler(GetUsersQuery)
export class GetAuthHandler implements IQueryHandler<GetUsersQuery>{
    constructor(
        private readonly authService: AuthService
    ){}
    async execute(command: GetUsersQuery): Promise<any> {
        return this.authService.getUsers();
    }
}
