import { Body, Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { authTypeReq } from "enum/auth";
import { AddAuthCommand, LoginAuthCommand } from "./commands/add-command";
import { AuthGuard } from "@nestjs/passport";
import { GetUsersQuery } from "./queries/getusers-query";
import { Roles, RolesGuard } from "./middleware/roles.guard";



@Controller("auth")
export class AuthController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post("register")
    async register(@Body() body: authTypeReq){
        return this.commandBus.execute(new AddAuthCommand(body));
    }

    @Post('login')
    async login(@Request() req: any) {
        return this.commandBus.execute(new LoginAuthCommand( req.body))
    }

    @Get()
    @Roles("Admin", "User")
    @UseGuards(RolesGuard)
    async getUsers(){
        return this.queryBus.execute(new GetUsersQuery())
    }

}