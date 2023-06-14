import { SchemaTypes } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reaction, ReactionDocument } from './like.schema';
import { Model } from 'mongoose';
import { resErrMessage, resFunction, resMessage } from 'src/utils/response';
import { Article, ArticleDocument } from '../article.schema';



@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Reaction.name)
        private readonly reactionModel: Model<ReactionDocument>,
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>
    ){}
    
    toggleLike(articleId: string, data:{user_id: string, reaction: string}){
        return resFunction(async()=>{
            let existArticle = await this.reactionModel.findOne({
                article_id: articleId
            })
            if(!existArticle){
                const resNow = new this.reactionModel({
                   article_id: articleId
                })
                resNow[data.reaction.toLocaleLowerCase()]?.push(data.user_id);
                const res = await resNow.save();
                if(!res) resErrMessage({ devError: "Error while liking", error: "Something went wrong"});
                const resArticle = await this.articleModel.findOneAndUpdate({
                    _id: res?.article_id
                }, {
                    $set: { reactions: res?._id} 
                }, {
                    new: true
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
                    }
                }, options: { sort: { _id: -1 } }}).populate("author")
                if(!resArticle) return resErrMessage({ devError: "Error in inserting like into article", error: "Something went wrong"});
                return resMessage(resArticle, "Successfully Liked!");
            }
            if(existArticle[data.reaction]?.includes(data.user_id)){
                existArticle[data.reaction]?.splice(existArticle[data.reaction]?.indexOf(data.user_id), 1);
                const { love, like, care } = existArticle;
                const tempArt = { love, like, care}
                // @ts-ignore
                const newData = { _id: existArticle._id, article_id: existArticle?.article_id, ...tempArt};
                const res = await this.reactionModel.findOneAndUpdate({
                    _id: existArticle?._id,
                }, newData, {
                    new: true
                })
                if(!res) resErrMessage({ devError: "Error while liking", error: "Something went wrong"});
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
                    }
                }, options: { sort: { _id: -1 } }}).populate("author")
                if(!resArticle) return resErrMessage({ devError: "Error in inserting like into existing article", error: "Something went wrong"});
                return resMessage(resArticle, "Successfully Toggled!");
            }
            existArticle[data.reaction]?.push(data.user_id);
            const { love, like, care } = existArticle;
            const tempArt = { love, like, care}
            Object.keys( tempArt && tempArt)?.forEach((react)=>{
                if(react !== data.reaction && tempArt[react]?.includes(data.user_id)){
                    tempArt[react]?.splice(tempArt[react]?.indexOf(data.user_id), 1);
                }
            })
            
            // @ts-ignore
            const newData = { _id: existArticle._id, article_id: existArticle?.article_id, ...tempArt};
            const res = await this.reactionModel.findOneAndUpdate({
                _id: existArticle?._id,
            }, newData, {
                new: true
            })
            if(!res) resErrMessage({ devError: "Error while liking", error: "Something went wrong"});
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
                    }
                }, options: { sort: { _id: -1 } }}).populate("author")
           
            if(!resArticle) return resErrMessage({ devError: "Error in inserting like into existing article", error: "Something went wrong"});
            return resMessage(resArticle, "Successfully Toggled!");
        })
    }

    getLike(articleId: string){
        const res = this.reactionModel.findOne({
            article_id: articleId
        })

        if(!res) return resErrMessage({devError: "Reactions of article can not found", error: "Something went wrong"});
        return resMessage(res, "Successfully found like");
    }
}