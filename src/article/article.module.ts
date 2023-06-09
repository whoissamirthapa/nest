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
import { Reaction, ReactionSchema } from "./like/like.schema";
import { Comment, commentSchema } from "./comment/comment.schema";


@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature(
            [
                {name: Article.name, schema: ArticleSchema},
                {name: Reaction.name, schema: ReactionSchema},
                {name: Comment.name, schema: commentSchema}
            ]
        )
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