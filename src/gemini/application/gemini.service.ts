import { Inject, Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_AI } from './gemini.constant';
import { env } from '~configs/env.config';

@Injectable()
export class GeminiService {
  private readonly proModel: GenerativeModel;
  constructor(@Inject(GEMINI_AI) genAI: GoogleGenerativeAI) {
    this.proModel = genAI.getGenerativeModel({ model: env.GEMINI.PRO_MODEL });

    console.log(env.GEMINI.KEY);
    console.log(this.proModel);
  }
}
