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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GeminiService } from '~gemini/application/gemini.service';
import { GenAiResponse } from '~gemini/domain/interface/response.interface';
import { GenerateTextDto } from './dto/generate-text.dto';
import { fileValidatorPipe } from './validation/file-validator.pipe';

@ApiTags('Gemini')
@Controller('gemini')
export class GeminiController {
  constructor(private service: GeminiService) {}

  @ApiBody({
    description: 'Prompt',
    required: true,
    type: GenerateTextDto,
  })
  @Post('text')
  generateText(@Body() dto: GenerateTextDto): Promise<GenAiResponse> {
    return this.service.generateText(dto.prompt);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Prompt',
        },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Binary file',
        },
      },
    },
  })
  @Post('text-and-image')
  @UseInterceptors(FileInterceptor('file'))
  async generateTextFromMultiModal(
    @Body() dto: GenerateTextDto,
    @UploadedFile(fileValidatorPipe)
    file: Express.Multer.File,
  ): Promise<GenAiResponse> {
    return this.service.generateTextFromMultiModal(dto.prompt, file);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Prompt',
        },
        first: {
          type: 'string',
          format: 'binary',
          description: 'Binary file',
        },
        second: {
          type: 'string',
          format: 'binary',
          description: 'Binary file',
        },
      },
    },
  })
  @Post('analyse-the-images')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'first', maxCount: 1 },
      { name: 'second', maxCount: 1 },
    ]),
  )
  async analyseImages(
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
