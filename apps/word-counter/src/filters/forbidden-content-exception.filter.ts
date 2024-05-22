import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ForbiddenContentException } from '../exceptions/forbidden-content.exception';

@Catch(ForbiddenContentException)
export class ForbiddenContentExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenContentException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
