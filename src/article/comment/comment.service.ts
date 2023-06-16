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

    addComment(article_id: string, user_id:string, comment: string, parent_id: any){
        // console.log(parent_id, article_id, comment);
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
                        parent_id: parent_id || null,
                        isReply: parent_id ? true : false,
                    }],
                    
                })
                res = await r.save();
                if(!res) return resErrMessage({ devError: "Error in commenting", error: "Something went wrong"});
                const article = await this.articleModel.findOneAndUpdate({
                    _id: res?.article_id
                }, {
                    $set: { comments: [res?._id]}
                }, { new: true }).populate(
                    { 
                        path:"reactions",
                            populate: 
                                [
                                    {
                                    path: 'love',
                                    select: '-password'
                                    
                                    },
                                    {
                                    path: 'care',
                                    select: '-password'
                                    
                                    },
                                    {
                                    path: 'like',
                                    select: '-password'
                                    
                                    }
                                ] 
                    }
            ).populate({ path:"comments", populate: {
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
            articleExist.comment?.push({
                user_id, comment,
                isReply: parent_id ? true: false,
                parent_id: parent_id || null
            });
            res = await articleExist.save()
            if(!res) return resErrMessage({ devError: "Error in commenting", error: "Something went wrong"});
            const resArticle = await this.articleModel.findOne({_id: res?.article_id}).populate(
                { 
                    path:"reactions",
                        populate: 
                            [
                                {
                                path: 'love',
                                select: '-password'
                                
                                },
                                {
                                path: 'care',
                                select: '-password'
                                
                                },
                                {
                                path: 'like',
                                select: '-password'
                                
                                }
                            ] 
                }
        ).populate({ path:"comments", populate: {
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

    deleteComment(id:string, comment_id: string, user:any){
        return resFunction(async()=>{
            // console.log(id);
            const existComment = await this.commentModel.findOne({
                _id: id,
            })
            if(!existComment) return resErrMessage({ devError: "Comment not found", error: "Something went wrong"});

            // @ts-ignore
            const comment = existComment.comment?.filter((item)=> item?.user_id === user?._id);
            if(!comment) return resErrMessage({ devError: "user is not authorized to delete this comment", error: "Something went wrong"})
            // @ts-ignore
            const index = existComment.comment?.findIndex(item => item?._id?.toString() === comment_id);
            console.log(index);
            if (index !== -1) {
                existComment.comment?.splice(index, 1);
            }
            
            const res = await existComment.save();
            
            // console.log(res);
            if(!res) return resErrMessage({devError: "Error in finding comment", error: "something went wrong"});
            const resArticle = await this.articleModel.findOne({
                _id: res?.article_id
            }).populate(
                { 
                    path:"reactions",
                        populate: 
                            [
                                {
                                path: 'love',
                                select: '-password'
                                
                                },
                                {
                                path: 'care',
                                select: '-password'
                                
                                },
                                {
                                path: 'like',
                                select: '-password'
                                
                                }
                            ] 
                }
            ).populate({ path:"comments", populate: {
                path: "comment",
                populate: {
                    path: "user_id",
                    select: "-password"
                },
                options: { sort: { _id: -1 } }
            }}).populate("author")
            if(!resArticle) return resErrMessage({ devError: "Error in getting article after deleting comment", error: "Something went wrong"})
            return resMessage(resArticle, "Successfully deleted!");
        })
    }
    updateComment(id:string, comment_id: string, comment: string, user:any){
        return resFunction(async()=>{
            console.log(id);
            const existComment = await this.commentModel.findOne({
                _id: id,
            })
            if(!existComment) return resErrMessage({ devError: "Comment not found", error: "Something went wrong"});

            // @ts-ignore
            const excomment = existComment.comment?.filter((item)=> item?.user_id === user?._id);
            if(!excomment) return resErrMessage({ devError: "user is not authorized to update this comment", error: "Something went wrong"})
            // @ts-ignore
            const index = existComment.comment?.findIndex(item => item?._id?.toString() === comment_id);
            if (index !== -1) {
                existComment.comment?.splice(index, 1, {
                    user_id: user?._id, comment: comment, _id: comment_id,
                    isReply: false,
                    parent_id: ''
                });
            }
            
            const res = await existComment.save();
            
            console.log(res?.article_id);
            if(!res) return resErrMessage({devError: "Error in finding comment", error: "something went wrong"});
            const resArticle = await this.articleModel.findOne({
                _id: res?.article_id
            }).populate(
                { 
                    path:"reactions",
                        populate: 
                            [
                                {
                                path: 'love',
                                select: '-password'
                                
                                },
                                {
                                path: 'care',
                                select: '-password'
                                
                                },
                                {
                                path: 'like',
                                select: '-password'
                                
                                }
                            ] 
                }
        ).populate({ path:"comments", populate: {
                path: "comment",
                populate: {
                    path: "user_id",
                    select: "-password"
                },
                options: { sort: { _id: -1 } }
            }}).populate("author")
            return resMessage(resArticle, "Successfully found!");
        })
    }


}