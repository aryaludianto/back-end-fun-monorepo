import { HttpException, HttpStatus } from '@nestjs/common';

export class LanguageException extends HttpException {
  constructor() {
    super('Wrong Language. Only English is supported.', HttpStatus.FORBIDDEN);
  }
}
