import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenContentException extends HttpException {
  constructor() {
    super('Content contains the forbidden word "the".', HttpStatus.BAD_REQUEST);
  }
}
