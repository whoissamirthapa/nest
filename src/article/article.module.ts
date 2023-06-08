import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./article.schema";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { AddArticleHandler, DeleteArticleHandler, DeleteArticlesHandler, UpdateArticleHandler } from "./handler/command-article.handler";
import { RolesGuard } from "src/auth/middleware/roles.guard";
import { JwtService } from "@nestjs/jwt";
import { GetArticlesHandler } from "./handler/query-article.handler";


@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{name: Article.name, schema: ArticleSchema}])
    ],
    controllers:[ArticleController],
    providers: [
        RolesGuard,
        JwtService,
        ArticleService,
        AddArticleHandler,
        GetArticlesHandler,
        UpdateArticleHandler,
        DeleteArticleHandler,
        DeleteArticlesHandler
    ]
})
export class ArticleModule{}