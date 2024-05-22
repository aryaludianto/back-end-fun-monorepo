import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { LanguageException } from '../exceptions/language.exception';

@Injectable()
export class LanguageGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const acceptLanguage = request.headers['accept-language'];
    if (!acceptLanguage || !acceptLanguage.startsWith('en')) {
      throw new LanguageException();
    }
    return true;
  }
}
