import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.listen(5000).then(()=>{
    console.log("Server is running on port 5000")
  }).catch((err)=>{
    console.log("error while starting server "+err)
  })
}
bootstrap();
