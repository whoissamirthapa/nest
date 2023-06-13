import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './article.schema';
import { Model } from 'mongoose';
import { resErrMessage, resFunction, resMessage } from 'src/utils/response';
import { Reaction, ReactionDocument } from './like/like.schema';
import { Comment, CommentDocument } from './comment/comment.schema';


@Injectable()
export class ArticleService{
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(Reaction.name)
        private readonly reactionModel: Model<ReactionDocument>,
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>
    ){}

    async addArticle(data: any){
        return resFunction(async()=>{
            const res = await this.articleModel.create(data);
            if(!res){
              return resErrMessage({ devError: "Error while inserting article", error: "Something went wrong!"})
            }
            return resMessage(res, "Successfully created!");
        })
    }
    async getArticles(){
        return resFunction(async()=>{
            const res = await this.articleModel.find().populate("reactions").populate({ path:"comments", populate: {
                path: "comment",
                populate: {
                   path: "user_id",
                   select: "-password"
                }
            },
            options: { sort: { _id: -1 } }
        }).populate("author", "display_name email first_name last_name image_url roles");

            if(!res){
                return resErrMessage({ devError: "Error while getting article", error: "Something went wrong!"})
            }
            const data = {}
            res?.forEach((item)=>{
                var authorId = item?.author["_id"]+item?.author['display_name'];
                if(!data[authorId]){
                    data[authorId] =[]
                }
                data[authorId]?.push(item);
            })
            return resMessage(data, "Successfully created!");
        })
    }

    updateArticle(id:string, data:any){
        return resFunction(async()=>{
            const res = await this.articleModel.findOneAndUpdate({
                _id: id,
            }, data, {
                new: true
            }).populate("reactions").populate({ path:"comments", populate: {
                path: "comment",
                populate: {
                   path: "user_id",
                   select: "-password"
                }
            }, options: { sort: { _id: -1 } }});
            if(!res) return resErrMessage({ devError: "Error while updating article", error: "Something went wrong!"})
            return resMessage(res, "Successfully updated");
        })
    }

    deleteArticle(id:string){
        return resFunction(async()=>{
            const res = await this.articleModel.findOneAndRemove({
                _id: id
            })
            if(!res) return resErrMessage({ devError: "Error while deleting article", error: "Something went wrong!"})
            await this.reactionModel.deleteOne({
                article_id: res?._id
            })
            await this.commentModel.deleteMany({
                article_id: res?.id
            })
            return resMessage(res, "Successfully deleted!");
        })
    }

    deleteArticles(id:string[]){
        return resFunction(async()=>{
            const res = await this.articleModel.deleteMany({ _id: { $in: id }})
            if(!res) return resErrMessage({ devError: "Error while deleting articles", error: "Something went wrong!"})
            console.log(res);
            return resMessage(res, "Successfully deleted!");
        })
    }
}





// const res = await this.articleModel.aggregate([
//     {
//       $lookup: {
//         from: 'auths', // Replace with the name of the author collection
//         localField: 'author',
//         foreignField: '_id',
//         as: 'author',
//       },
//     },
//     {
//       $unwind: '$author',
//     },
//     {
//       $lookup: {
//         from: 'comments', // Replace with the name of the comments collection
//         localField: '_id',
//         foreignField: 'article_id',
//         as: 'comments',
//       },
//     },
//     {
//       $lookup: {
//         from: 'reactions', // Replace with the name of the likes collection
//         localField: '_id',
//         foreignField: 'article_id',
//         as: 'reactions',
//       },
//     },
//     {
//         $unwind: '$comments',
//       },
//       {
//         $unwind: '$reactions',
//       },
//     {
//       $group: {
//         _id: '$author', // Group by the author
//         articles: {
//           $push: {
//             _id: '$_id',
//             title: '$title',
//             description: '$description',
//             comments: '$comments',
//             reactions: '$reactions',
//           },
//         },
//       },
//     },
//   ]).exec()
