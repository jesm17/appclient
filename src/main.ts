import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'js'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
