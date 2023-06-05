import { ContactService } from './../contact.service';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetContactQuery } from "../queries/get-contact.query";


@QueryHandler(GetContactQuery)
export class GetContactHandler implements IQueryHandler<GetContactQuery>{
   constructor(
    private readonly contactService: ContactService
   ){
   }

   async execute(query: GetContactQuery): Promise<any> {
    //    console.log("get contact Handler",query)
       return this.contactService.getContact();
   }
}