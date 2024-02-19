import { Inject, Injectable, Logger } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_AI } from './gemini.constant';
import { env } from '~configs/env.config';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly proModel: GenerativeModel;

  constructor(@Inject(GEMINI_AI) genAI: GoogleGenerativeAI) {
    this.proModel = genAI.getGenerativeModel({
      model: env.GEMINI.PRO_MODEL,
      generationConfig: { maxOutputTokens: 2048, temperature: 1, topK: 32, topP: 1 },
    });
  }

  async generateText(prompt: string): Promise<string> {
    const result = await this.proModel.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const response = await result.response;
    const text = response.text();

    this.logger.log(JSON.stringify(text));
    return text;
  }
}
