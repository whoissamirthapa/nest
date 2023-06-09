import { Module} from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, commentSchema } from './comment.schema';
import { Article, ArticleSchema } from '../article.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/middleware/roles.guard';
import { AddCommentHandler, GetCommentHandler } from './handler/comment.handler';

@Module({
    imports: [
        CqrsModule, 
        MongooseModule.forFeature(
            [
                {name: Comment.name, schema: commentSchema}, 
                {name: Article.name, schema: ArticleSchema}
            ]
        )
    ],
    controllers:[CommentController],
    providers: [
        JwtService, 
        RolesGuard, 
        CommentService, 
        AddCommentHandler,
        GetCommentHandler
    ],
})
export class CommentModule{}