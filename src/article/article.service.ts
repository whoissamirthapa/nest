import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './article.schema';
import { Model } from 'mongoose';
import { resFunction, resMessage } from 'src/utils/response';


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
              throw "Something went wrong"
            }
            return resMessage(res, "Successfully created!");
        })
    }
    async getArticles(){
        return resFunction(async()=>{
            const res = await this.articleModel.find();
            if(!res){
                throw "Something went wrong"
            }
            return resMessage(res, "Successfully created!");
        })
    }
}