import { Module } from '@nestjs/common';
import { GeminiProvider } from './application/gemini.provider';
import { GeminiService } from './application/gemini.service';
import { GeminiController } from './presenters/http/gemini.controller';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService, GeminiProvider],
})
export class GeminiModule {}
