import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from "./contact.schema";
import { Model } from "mongoose";

@Injectable()
export class ContactService{
    constructor(
        @InjectModel(Contact.name)
        private contactModel: Model<ContactDocument>
    ){}

    async createContact(data: {name: string, count_people: number, datetime: Date, message: string}){
        if(data){
            try {
                const res = await this.contactModel.create(data);
                // console.log("create Service",res);
                return {
                    success: true,
                    data: res,
                    error: ""
                };
            } catch (error) {
                console.log("service error", error);
                return {
                    success: false,
                    data: {},
                    error
                }
            }
        }
    }


    async getContact(){
        try {
            const res = await this.contactModel.find();
            // console.log("get contact service ", res);
            return {
                success: true,
                data: res,
                error: ""
            }
        } catch (error) {
            console.log("get contact service error", error);
            return {
                success: false,
                data: {},
                error
            }
        }
    }
}

