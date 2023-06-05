import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateContactCommand } from "../command/create-contact.command";
import { ContactService } from "../contact.service";


@CommandHandler(CreateContactCommand)
export class CreateContactHandler implements ICommandHandler<CreateContactCommand>{
    constructor(
        private readonly contactService: ContactService
    ){}

    async execute(command: CreateContactCommand): Promise<any> {
        const res =  await this.contactService.createContact(command.data);
        // console.log("create Handler ",res);
        return res;
    }
}