import { Test, TestingModule } from '@nestjs/testing';
import { TextSubmissionService } from './text-submission.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TextSubmission } from '../entities/text-submission-entitiy';
import { Repository } from 'typeorm';
import { CreateTextSubmissionDto } from '../dto/create-text-submission.dto';
import { ForbiddenContentException } from '../exceptions/forbidden-content.exception';

describe('TextSubmissionService', () => {
  let service: TextSubmissionService;
  let repository: Repository<TextSubmission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TextSubmissionService,
        {
          provide: getRepositoryToken(TextSubmission),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TextSubmissionService>(TextSubmissionService);
    repository = module.get<Repository<TextSubmission>>(
      getRepositoryToken(TextSubmission)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a text submission', async () => {
      const createTextSubmissionDto: CreateTextSubmissionDto = {
        content: 'This is a test submission.',
      };
      const textSubmission = new TextSubmission();
      textSubmission.content = createTextSubmissionDto.content;

      jest.spyOn(repository, 'save').mockResolvedValue(textSubmission);

      expect(await service.create(createTextSubmissionDto)).toBe(
        textSubmission
      );
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ content: 'This is a test submission.' })
      );
    });

    it('should throw ForbiddenContentException if content contains the word "the"', async () => {
      const createTextSubmissionDto: CreateTextSubmissionDto = {
        content: 'This is the forbidden word.',
      };

      await expect(service.create(createTextSubmissionDto)).rejects.toThrow(
        ForbiddenContentException
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of text submissions', async () => {
      const textSubmissions = [
        { id: 1, content: 'First submission' } as TextSubmission,
        { id: 2, content: 'Second submission' } as TextSubmission,
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(textSubmissions);

      expect(await service.findAll()).toBe(textSubmissions);
      expect(repository.find).toHaveBeenCalled();
    });
  });
});
