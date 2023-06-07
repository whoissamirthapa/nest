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

@Module({
  imports: [
    TodoModule, 
    TodoModuleWithoutCQRS, 
    DatabaseModule, 
    ContactMessage, 
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
