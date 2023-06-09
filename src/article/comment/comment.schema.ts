import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment{

    @Prop({required: true, type: SchemaTypes.ObjectId, ref: "Article"})
    article_id: string

    @Prop([{
        user_id: { type: SchemaTypes.ObjectId, ref: 'Auth' },
        comment: { type: String },
    }])
    comment: { user_id: string; comment: string }[];

}

export const commentSchema = SchemaFactory.createForClass(Comment);

