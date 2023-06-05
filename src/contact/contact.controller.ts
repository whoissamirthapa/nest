import { Body, Controller, Post, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateContactCommand } from "./command/create-contact.command";
import { GetContactQuery } from "./queries/get-contact.query";

type contactType = {name: string, count_people: number, datetime: Date, message: string}

@Controller("contact")
export class ContactController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ){}

    @Post()
    async createContact(@Body() body: contactType){
        const res = await this.commandBus.execute(new CreateContactCommand(body))
        return res;
    }

    @Get()
    async getContact(){
        console.log("get contact controller")
        return this.queryBus.execute(new GetContactQuery())
    }
}