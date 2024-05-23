import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenContentException extends HttpException {
  constructor(forbiddenWord: string) {
    super(
      `Content contains the forbidden word ${forbiddenWord}.`,
      HttpStatus.BAD_REQUEST
    );
  }
}
