import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./article.schema";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { AddArticleHandler } from "./handler/command-article.handler";


@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{name: Article.name, schema: ArticleSchema}])
    ],
    controllers:[ArticleController],
    providers: [
        ArticleService,
        AddArticleHandler
    ]
})
export class ArticleModule{}