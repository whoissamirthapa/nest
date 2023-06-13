import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, SchemaType, SchemaTypes } from "mongoose";

export type ArticleDocument = Article & Document;

@Schema()
export class Article extends Document{
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

export const ArticleSchema = SchemaFactory.createForClass(Article).set("timestamps", true)

const deleteLikesAndComments = async function (next) {
   const postId = this._conditions._id;
 
   // Delete likes associated with the post
   await mongoose.model('Like').deleteMany({ post_id: postId });
 
   // Delete comments associated with the post
   await mongoose.model('Comment').deleteMany({ post_id: postId });
 
   next();
 };
//  ArticleSchema.pre('deleteOne', { document: true }, deleteLikesAndComments);