import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ContactDocument = Contact & Document

@Schema()
export class Contact{
    @Prop({ required: true})
    name: string;

    @Prop({ required: true})
    count_people: number;

    @Prop({ required: true})
    datetime: Date;

    @Prop({ required: false})
    message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);