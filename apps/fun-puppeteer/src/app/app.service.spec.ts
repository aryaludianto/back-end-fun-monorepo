import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { PuppeteerService } from '@back-end-fun-project/puppeteer-base';

describe('AppService', () => {
  let service: AppService;
  let puppeteerService: PuppeteerService;
  let configService: ConfigService;

  // Create mocks for each service
  const mockConfigService = {
    get: jest.fn((key) => {
      if (key === 'NODE_ENV') {
        return 'production';
      }
      return null; // Return null or a default value for any other key
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: PuppeteerService,
          useValue: {
            newBrowser: jest.fn().mockImplementation((headless) => {
              const page = {
                goto: jest.fn().mockResolvedValue(null),
                waitForSelector: jest.fn().mockResolvedValue(null),
                type: jest.fn().mockResolvedValue(null),
                keyboard: {
                  press: jest.fn().mockResolvedValue(null),
                },
                waitForNavigation: jest.fn().mockResolvedValue(null),
                screenshot: jest
                  .fn()
                  .mockResolvedValue('screenshot_base64_string'),
              };
              return {
                close: jest.fn(),
                newPage: jest.fn().mockResolvedValue(page),
              };
            }),
          },
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    puppeteerService = module.get<PuppeteerService>(PuppeteerService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchBing', () => {
    it('should return a base64 string of the screenshot', async () => {
      const query = 'example query';
      const result = await service.searchBing(query);
      expect(result).toEqual('screenshot_base64_string');
      expect(configService.get).toHaveBeenCalledWith('NODE_ENV');
      expect(puppeteerService.newBrowser).toHaveBeenCalledWith(true);
    });
  });
});
