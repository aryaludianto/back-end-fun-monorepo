import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            searchBing: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService); // Ensure service is being retrieved
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call searchBing on AppService with the correct parameter and return a base64 string', async () => {
    const searchText = 'test';
    jest
      .spyOn(service, 'searchBing')
      .mockResolvedValue('base64_string_of_screenshot');
    const result = await controller.searchBing(searchText);
    expect(result).toEqual('base64_string_of_screenshot');

    expect(service.searchBing).toHaveBeenCalledWith(searchText);
  });
});
