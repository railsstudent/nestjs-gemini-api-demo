import { Body, Controller } from '@nestjs/common';
import { GeminiService } from '~gemini/application/gemini.service';
import { GenerateTextDto } from './dto/generate-text.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private service: GeminiService) {}

  generateText(@Body() dto: GenerateTextDto): Promise<string> {
    return this.service.generateText(dto.prompt);
  }
}
