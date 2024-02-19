import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [GeminiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
