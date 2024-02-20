import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';

export const fileValidatorPipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
    new FileTypeValidator({ fileType: new RegExp('image/[jpeg|png]') }),
  ],
});
