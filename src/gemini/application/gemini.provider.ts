import { GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { GEMINI_AI } from './gemini.constant';

export const GeminiProvider: Provider = {
  provide: GEMINI_AI,
  useValue: new GoogleGenerativeAI(env.GEMINI.KEY),
};
