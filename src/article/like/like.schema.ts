import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type ReactionDocument = Reaction & Document;

@Schema()
export class Reaction{

    @Prop({required: true, type: SchemaTypes.ObjectId, ref: "Article"})
    article_id: string;

    @Prop({type: [SchemaTypes.ObjectId], ref: "Auth"})
    like: string[]
    
    @Prop({type: [SchemaTypes.ObjectId], ref: "Auth"})
    love: string[]

    @Prop({type: [SchemaTypes.ObjectId], ref: "Auth"})
    care: string[]
    
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);