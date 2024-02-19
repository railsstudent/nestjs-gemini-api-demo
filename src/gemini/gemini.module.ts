import { Module } from '@nestjs/common';
import { GeminiController } from './presenters/http/gemini.controller';

@Module({
  controllers: [GeminiController],
})
export class GeminiModule {}
