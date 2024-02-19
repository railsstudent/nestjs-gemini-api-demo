import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from '~gemini/application/gemini.service';
import { GenerateTextDto } from './dto/generate-text.dto';
import { GenAiResponse } from '~gemini/domain/interface/response.interface';

@Controller('gemini')
export class GeminiController {
  constructor(private service: GeminiService) {}

  @Post('text')
  generateText(@Body() dto: GenerateTextDto): Promise<GenAiResponse> {
    return this.service.generateText(dto.prompt);
  }
}
