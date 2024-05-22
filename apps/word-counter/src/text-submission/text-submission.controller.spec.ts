import { Test, TestingModule } from '@nestjs/testing';
import { TextSubmissionController } from './text-submission-controller';
import { TextSubmissionService } from './text-submission.service';
import { LanguageGuard } from '../guards/language-guard';
import { CreateTextSubmissionDto } from '../dto/create-text-submission.dto';

describe('TextSubmissionController', () => {
  let textSubmissionController: TextSubmissionController;
  let textSubmissionService: TextSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextSubmissionController],
      providers: [
        {
          provide: TextSubmissionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(LanguageGuard)
      .useValue({
        canActivate: jest.fn(() => true), // Mock the guard to always allow
      })
      .compile();

    textSubmissionController = module.get<TextSubmissionController>(
      TextSubmissionController
    );
    textSubmissionService = module.get<TextSubmissionService>(
      TextSubmissionService
    );
  });

  it('should be defined', () => {
    expect(textSubmissionController).toBeDefined();
  });

  describe('create', () => {
    it('should call textSubmissionService.create with the correct DTO', async () => {
      const createTextSubmissionDto: CreateTextSubmissionDto = {
        content: 'This is a test text submission.',
      };
      const result = { id: 1, content: 'This is a test text submission.' };

      jest.spyOn(textSubmissionService, 'create').mockResolvedValue(result);

      expect(
        await textSubmissionController.create(createTextSubmissionDto)
      ).toBe(result);
      expect(textSubmissionService.create).toHaveBeenCalledWith(
        createTextSubmissionDto
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of text submissions', async () => {
      const result = [
        { id: 1, content: 'This is a test text submission.' },
        { id: 2, content: 'Another text submission.' },
      ];

      jest.spyOn(textSubmissionService, 'findAll').mockResolvedValue(result);

      expect(await textSubmissionController.findAll()).toBe(result);
      expect(textSubmissionService.findAll).toHaveBeenCalled();
    });
  });
});
