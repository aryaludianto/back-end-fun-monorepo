import { ForbiddenContentExceptionFilter } from './forbidden-content-exception.filter';
import { ForbiddenContentException } from '../exceptions/forbidden-content.exception';
import { ArgumentsHost } from '@nestjs/common';

describe('ForbiddenContentExceptionFilter', () => {
  let filter: ForbiddenContentExceptionFilter;

  beforeEach(() => {
    filter = new ForbiddenContentExceptionFilter();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should catch ForbiddenContentException and return the proper response', () => {
    const exception = new ForbiddenContentException();
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockArgumentsHost: Partial<ArgumentsHost> = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    };

    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(400); // HttpStatus.BAD_REQUEST
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 400,
      message: 'Content contains the forbidden word "the".',
    });
  });
});
