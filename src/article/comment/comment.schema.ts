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
        isReply: { type: Boolean },
        parent_id: { type: SchemaTypes.ObjectId, ref: "Comment" }
    }])
    comment: {
        [x: string]: unknown; 
        user_id: string; 
        comment: string; 
        isReply: boolean;
        parent_id: string;
    }[];
}

export const commentSchema = SchemaFactory.createForClass(Comment).set('timestamps', true);

