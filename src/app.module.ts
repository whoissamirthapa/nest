import { loginAuth } from './../enum/auth/index';
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

@Module({
  imports: [
    TodoModule, 
    TodoModuleWithoutCQRS, 
    DatabaseModule, 
    ContactMessage, 
    AuthModule,
    JwtModule.register({
      secret: 'fagalsiefasldfkansodifansoif',
      signOptions: { expiresIn: '10d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register(),
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
