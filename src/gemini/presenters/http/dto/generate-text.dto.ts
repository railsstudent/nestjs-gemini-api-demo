import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTextDto {
  @ApiProperty({
    name: 'prompt',
    description: 'prompt of the question',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  prompt: string;
}
