import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Comment, CommentDocument } from './comment.schema';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../article.schema';
import { resErrMessage, resFunction, resMessage } from 'src/utils/response';


@Injectable()
export class CommentService{
    constructor(
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>
    ){}

    addComment(article_id: string, user_id:string, comment: string){
        return resFunction(async()=>{
            const articleExist = await this.commentModel.findOne({
                article_id: article_id,
            })

            var res:any;
            if(!articleExist){
                const r = new this.commentModel({
                    article_id,
                    comment: [{
                        user_id,
                        comment,
                    }]
                })
                res = await r.save();
                if(!res) return resErrMessage({ devError: "Error in commenting", error: "Something went wrong"});
                const article = await this.articleModel.findOneAndUpdate({
                    _id: res?.article_id
                }, {
                    $set: { comments: [res?._id]}
                }, { new: true }).populate("reactions").populate({ path:"comments", populate: {
                    path: "comment",
                    populate: {
                       path: "user_id",
                       select: "-password"
                    },
                    options: { sort: { _id: -1 } }
                }, }).populate("author");
                if(!article) return resErrMessage({ devError: "Error in adding comment in article", error: "Something went wrong"});
                return resMessage(article, "Successfully created!")
            }
            articleExist.comment?.push({user_id, comment});
            res = await articleExist.save()
            if(!res) return resErrMessage({ devError: "Error in commenting", error: "Something went wrong"});
            const resArticle = await this.articleModel.findOne({_id: res?.article_id}).populate("reactions").populate({ path:"comments", populate: {
                path: "comment",
                populate: {
                    path: "user_id",
                    select: "-password"
                },
                options: { sort: { _id: -1 } }
            }}).populate("author")
           
            if(!resArticle) return resErrMessage({ devError: "Error in inserting comment into existing article", error: "Something went wrong"});
            return resMessage(resArticle, "Successfully added!");
        })

    }

    getComment(id:string){
        return resFunction(async()=>{
            console.log(id);
            const res = await this.commentModel.findById(id);
            console.log(res);
            if(!res) return resErrMessage({devError: "Error in finding comment", error: "something went wrong"});
            return resMessage(res, "Successfully found!");
        })
    }
}