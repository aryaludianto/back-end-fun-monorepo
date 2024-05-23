import { Test, TestingModule } from '@nestjs/testing';
import { TextSubmissionService } from './text-submission.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { TextSubmission } from '../entities/text-submission-entitiy';
import { CreateTextSubmissionDto } from '../dto/create-text-submission.dto';
import { ForbiddenContentException } from '../exceptions/forbidden-content.exception';

describe('TextSubmissionService', () => {
  let service: TextSubmissionService;
  let repository: Repository<TextSubmission>;
  let configService: ConfigService;

  const mockTextSubmissionRepository = {
    save: jest
      .fn()
      .mockImplementation((textSubmission) =>
        Promise.resolve({ id: 1, ...textSubmission })
      ),
    find: jest.fn().mockResolvedValue([{ id: 1, content: 'Sample text' }]),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('forbidden,word'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TextSubmissionService,
        {
          provide: getRepositoryToken(TextSubmission),
          useValue: mockTextSubmissionRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<TextSubmissionService>(TextSubmissionService);
    repository = module.get<Repository<TextSubmission>>(
      getRepositoryToken(TextSubmission)
    );
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a text submission successfully', async () => {
    const createTextSubmissionDto: CreateTextSubmissionDto = {
      content: 'This is a valid content',
    };
    const result = await service.create(createTextSubmissionDto);
    expect(result).toEqual({ id: 1, content: 'This is a valid content' });
    expect(repository.save).toHaveBeenCalledWith({
      content: 'This is a valid content',
    });
  });

  it('should throw ForbiddenContentException if content contains forbidden words', async () => {
    const createTextSubmissionDto: CreateTextSubmissionDto = {
      content: 'This contains forbidden word',
    };

    await expect(service.create(createTextSubmissionDto)).rejects.toThrow(
      ForbiddenContentException
    );
  });

  it('should return all text submissions', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, content: 'Sample text' }]);
    expect(repository.find).toHaveBeenCalled();
  });
});
