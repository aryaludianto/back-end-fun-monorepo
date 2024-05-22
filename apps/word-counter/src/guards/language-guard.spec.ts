import { LanguageGuard } from './language-guard';
import { LanguageException } from '../exceptions/language.exception';
import { ExecutionContext } from '@nestjs/common';

describe('LanguageGuard', () => {
  let guard: LanguageGuard;

  beforeEach(() => {
    guard = new LanguageGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access when "Accept-Language" header starts with "en"', () => {
    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            'accept-language': 'en-US,en;q=0.9',
          },
        }),
      }),
    };

    expect(guard.canActivate(mockExecutionContext as ExecutionContext)).toBe(
      true
    );
  });

  it('should deny access and throw LanguageException when "Accept-Language" header is missing', () => {
    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {},
        }),
      }),
    };

    expect(() =>
      guard.canActivate(mockExecutionContext as ExecutionContext)
    ).toThrow(LanguageException);
  });

  it('should deny access and throw LanguageException when "Accept-Language" header does not start with "en"', () => {
    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            'accept-language': 'fr-FR,fr;q=0.9',
          },
        }),
      }),
    };

    expect(() =>
      guard.canActivate(mockExecutionContext as ExecutionContext)
    ).toThrow(LanguageException);
  });
});
