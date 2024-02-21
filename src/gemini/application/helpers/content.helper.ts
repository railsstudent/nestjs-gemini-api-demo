import { Content, Part } from '@google/generative-ai';

export function createContent(text: string, ...images: Express.Multer.File[]): Content[] {
  const imageParts: Part[] = images.map((image) => {
    return {
      inlineData: {
        mimeType: image.mimetype,
        data: image.buffer.toString('base64'),
      },
    };
  });

  return [
    {
      role: 'user',
      parts: [
        ...imageParts,
        {
          text,
        },
      ],
    },
  ];
}
