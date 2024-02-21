import { Module } from '@nestjs/common';
import { GeminiProModelProvider, GeminiProVisionModelProvider } from './application/gemini.provider';
import { GeminiService } from './application/gemini.service';
import { GeminiController } from './presenters/http/gemini.controller';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService, GeminiProModelProvider, GeminiProVisionModelProvider],
})
export class GeminiModule {}
