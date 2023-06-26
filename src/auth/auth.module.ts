import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AddAuthHandler,
  GetAuthHandler,
  GetProfileHandler,
  LoginAuthHandler,
  ToggleFollowHandler,
  UpdateAuthHandler,
} from './handler/auth-handler';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AddAuthHandler,
    LoginAuthHandler,
    GetAuthHandler,
    GetProfileHandler,
    UpdateAuthHandler,
    ToggleFollowHandler,
    JwtService,
  ],
})
export class AuthModule {}
