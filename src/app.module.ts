import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModuleWithoutCQRS } from './controller/todo.module';
import { TodoModule } from './crud/todo.module';
import { DatabaseModule } from './config/dbconfig';
import { ContactMessage } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { ArticleModule } from './article/article.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LikeModule } from './article/like/like.module';
import { CommentModule } from './article/comment/comment.module';

@Module({
  imports: [
    TodoModule,
    TodoModuleWithoutCQRS,
    DatabaseModule,
    JwtModule.register({
      secret: 'hello',
      signOptions: { expiresIn: '10d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register(),
    ContactMessage,
    AuthModule,
    ArticleModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
