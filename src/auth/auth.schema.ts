import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AuthDocument = Auth & Document

@Schema()
export class Auth{
    @Prop({required: true})
    first_name: string

    @Prop({required:true})
    last_name: string

    @Prop({ required: true})
    display_name: string;

    @Prop({required: true, unique: true, lowercase: true})
    email: string

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    image_url: string
}

export const AuthSchema = SchemaFactory.createForClass(Auth);