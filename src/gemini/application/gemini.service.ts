import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { env } from '~configs/env.config';
import { GENERATION_CONFIG, SAFETY_SETTINGS } from '~configs/gemini.config';
import { GenAiResponse } from '~gemini/domain/interface/response.interface';
import { GEMINI_AI } from './gemini.constant';
import { createContent } from './helpers/content.helper';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly proModel: GenerativeModel;
  private readonly proVisionModel: GenerativeModel;

  constructor(@Inject(GEMINI_AI) genAI: GoogleGenerativeAI) {
    this.proModel = genAI.getGenerativeModel({
      model: env.GEMINI.PRO_MODEL,
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });

    this.proVisionModel = genAI.getGenerativeModel({
      model: env.GEMINI.PRO_VISION_MODEL,
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  }

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
    const contents = createContent(prompt, file);

    const { totalTokens } = await this.proVisionModel.countTokens({ contents });
    this.logger.log(`Tokens: ${JSON.stringify(totalTokens)}`);

    const result = await this.proVisionModel.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    this.logger.log(JSON.stringify(text));
    return { totalTokens, text };
  }

  async tellTheDifferences(firstImage: Express.Multer.File, secondImage: Express.Multer.File): Promise<GenAiResponse> {
    const contents = createContent(
      'Are the two images the same? If yes, then reply "Yes". If not, then list their differences in point form.',
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
