import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000'),
  GEMINI: {
    KEY: process.env.GEMINI_API_KEY || '',
    PRO_MODEL: process.env.GEMINI_PRO_MODEL || 'gemini-pro',
    PRO_VISION_MODEL: process.env.GEMINI_PRO_VISION_MODEL || 'gemini-pro-vision',
  },
};
