import { NestFactory } from '@nestjs/core';
import { env } from '~configs/env.config';
import { validateConfig } from '~configs/validate.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(validateConfig);
  await app.listen(env.PORT);
}
bootstrap();
