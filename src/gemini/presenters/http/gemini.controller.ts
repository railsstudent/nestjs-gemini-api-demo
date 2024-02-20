import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GeminiService } from '~gemini/application/gemini.service';
import { GenAiResponse } from '~gemini/domain/interface/response.interface';
import { GenerateTextDto } from './dto/generate-text.dto';
import { fileValidatorPipe } from './validation/file-validator.pipe';

@Controller('gemini')
export class GeminiController {
  constructor(private service: GeminiService) {}

  @Post('text')
  generateText(@Body() dto: GenerateTextDto): Promise<GenAiResponse> {
    return this.service.generateText(dto.prompt);
  }

  @Post('text-and-image')
  @UseInterceptors(FileInterceptor('file'))
  async generateTextFromMultiModal(
    @Body() dto: GenerateTextDto,
    @UploadedFile(fileValidatorPipe)
    file: Express.Multer.File,
  ): Promise<any> {
    console.log(dto.prompt);
    console.log(file);
    return file;
  }
}
