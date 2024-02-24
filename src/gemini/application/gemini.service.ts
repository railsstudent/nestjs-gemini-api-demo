import { GenerativeModel } from '@google/generative-ai';
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { GenAiResponse } from '~gemini/domain/interface/response.interface';
import { createContent } from './helpers/content.helper';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_MODEL } from './gemini.constant';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);

  constructor(
    @Inject(GEMINI_PRO_MODEL) private readonly proModel: GenerativeModel,
    @Inject(GEMINI_PRO_VISION_MODEL) private readonly proVisionModel: GenerativeModel,
  ) {}

  async generateText(prompt: string): Promise<GenAiResponse> {
    const contents = createContent(prompt);

    const { totalTokens } = await this.proModel.countTokens({ contents });
    this.logger.log(`Tokens: ${JSON.stringify(totalTokens)}`);

    const result = await this.proModel.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    this.logger.log(JSON.stringify(text));
    return { totalTokens, text };
  }

  async generateTextFromMultiModal(prompt: string, file: Express.Multer.File): Promise<GenAiResponse> {
    try {
      const contents = createContent(prompt, file);

      const { totalTokens } = await this.proVisionModel.countTokens({ contents });
      this.logger.log(`Tokens: ${JSON.stringify(totalTokens)}`);

      const result = await this.proVisionModel.generateContent({ contents });
      const response = await result.response;
      const text = response.text();

      this.logger.log(JSON.stringify(text));
      return { totalTokens, text };
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerErrorException(err.message, err.stack);
      }
      throw err;
    }
  }

  async tellTheDifferences(firstImage: Express.Multer.File, secondImage: Express.Multer.File): Promise<GenAiResponse> {
    const contents = createContent(
      'Are the two images the same? If yes, then reply "Yes". If not, then describes the colors, objects, texts, facial expressions, and emotions in details.',
      firstImage,
      secondImage,
    );

    const { totalTokens } = await this.proVisionModel.countTokens({ contents });
    this.logger.log(`Tokens: ${JSON.stringify(totalTokens)}`);

    const result = await this.proVisionModel.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    this.logger.log(JSON.stringify(text));
    return { totalTokens, text };
  }
}
