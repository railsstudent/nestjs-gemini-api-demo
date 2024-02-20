import { NestFactory } from '@nestjs/core';
import { env } from '~configs/env.config';
import { validateConfig } from '~configs/validate.config';
import { AppModule } from './app.module';
import express from 'express';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(validateConfig);
  app.use(express.json({ limit: '1000kb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
  await app.listen(env.PORT);
}
bootstrap();
