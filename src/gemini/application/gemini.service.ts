import { Inject, Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_AI } from './gemini.constant';
import { env } from '~configs/env.config';

@Injectable()
export class GeminiService {
  private readonly proModel: GenerativeModel;
  constructor(@Inject(GEMINI_AI) genAI: GoogleGenerativeAI) {
    this.proModel = genAI.getGenerativeModel({
      model: env.GEMINI.PRO_MODEL,
      generationConfig: { maxOutputTokens: 2048, temperature: 1, topK: 32, topP: 1 },
    });
  }

  async generateText(prompt: string): Promise<string> {
    const streamingResponse = await this.proModel.generateContentStream({
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

    const response = await streamingResponse.response;
    const text = response.text();

    console.log(text);
    return text;
  }
}
