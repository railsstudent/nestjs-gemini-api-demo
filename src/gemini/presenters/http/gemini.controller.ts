import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
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
  ): Promise<GenAiResponse> {
    return this.service.generateTextFromMultiModal(dto.prompt, file);
  }

  @Post('analyse-the-images')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'first', maxCount: 1 },
      { name: 'second', maxCount: 1 },
    ]),
  )
  async tellTheDifferences(
    @Body() dto: GenerateTextDto,
    @UploadedFiles()
    files: {
      first?: Express.Multer.File[];
      second?: Express.Multer.File[];
    },
  ): Promise<GenAiResponse> {
    if (!files.first?.length) {
      throw new BadRequestException('The first image is missing');
    }

    if (!files.second?.length) {
      throw new BadRequestException('The second image is missing');
    }
    return this.service.analyzeImages({ prompt: dto.prompt, firstImage: files.first[0], secondImage: files.second[0] });
  }
}
