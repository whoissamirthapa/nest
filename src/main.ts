import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SocketAdapter } from './config/socket-config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false,
    prefix: '/public',
  });
  app.useWebSocketAdapter(new SocketAdapter(app));
  app
    .listen(5000)
    .then(() => {
      console.log('Server is running on port 5000');
    })
    .catch((err) => {
      console.log('error while starting server ' + err);
    });
}
bootstrap();
