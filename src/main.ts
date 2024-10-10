import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: true });
  app.useStaticAssets(join(
    __dirname,
    '..',
    config.get('STATIC_PATH'),
    config.get('IMAGE_POST_PATH'),
  ), {
    prefix: '/static/avatar',
  });
  await app.listen(config.get('PORT'));
}
bootstrap();