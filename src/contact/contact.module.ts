import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { Contact, ContactSchema } from './contact.schema';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { CreateContactHandler } from './handler/create-contact.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetContactHandler } from './handler/get-contact.handler';


@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{name: Contact.name, schema: ContactSchema}])
    ],
    controllers: [ContactController],
    providers: [
        ContactService,
        CreateContactHandler, 
        GetContactHandler
    ]
})

export class ContactMessage{}