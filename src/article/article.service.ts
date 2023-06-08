import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './article.schema';
import { Model } from 'mongoose';
import { resErrMessage, resFunction, resMessage } from 'src/utils/response';


@Injectable()
export class ArticleService{
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>
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
            const res = await this.articleModel.find();
            if(!res){
                return resErrMessage({ devError: "Error while getting article", error: "Something went wrong!"})
            }
            return resMessage(res, "Successfully created!");
        })
    }

    updateArticle(id:string, data:any){
        return resFunction(async()=>{
            const res = await this.articleModel.findOneAndUpdate({
                _id: id,
            }, data, {
                new: true
            })
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