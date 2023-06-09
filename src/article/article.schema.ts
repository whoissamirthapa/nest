import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaType, SchemaTypes } from "mongoose";

export type ArticleDocument = Article & Document;

@Schema()
export class Article{
   @Prop({ required: true, ref: "Auth"})
   author: string

   @Prop({ required: true})
   title: string

   @Prop({ required: true})
   description: string

   @Prop({type: SchemaTypes.ObjectId, ref: "Reaction"})
   reactions: string

   @Prop({type: SchemaTypes.ObjectId, ref: "Comment"})
   comments: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)