export interface AnalyzeImage {
  prompt: string;
  firstImage: Express.Multer.File;
  secondImage: Express.Multer.File;
}
