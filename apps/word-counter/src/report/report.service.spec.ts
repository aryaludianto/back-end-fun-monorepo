// src/report/report.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { TextSubmissionService } from '../text-submission/text-submission.service';
import { GetReportDto } from '../dto/get-report.dto';
import { TextSubmission } from '../entities/text-submission-entitiy';

describe('ReportService', () => {
  let reportService: ReportService;
  let textSubmissionService: TextSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: TextSubmissionService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    reportService = module.get<ReportService>(ReportService);
    textSubmissionService = module.get<TextSubmissionService>(
      TextSubmissionService
    );
  });

  it('should be defined', () => {
    expect(reportService).toBeDefined();
  });

  describe('getMostCommonWords', () => {
    it('should return the most common words', async () => {
      const submissions: TextSubmission[] = [
        { id: 1, content: 'hello world' },
        { id: 2, content: 'hello NestJS' },
        { id: 3, content: 'hello hello world' },
      ];
      const getReportDto: GetReportDto = { numberOfWords: 2 };
      const expectedResult = { hello: 4, world: 2 };

      jest
        .spyOn(textSubmissionService, 'findAll')
        .mockResolvedValue(submissions);

      const result = await reportService.getMostCommonWords(getReportDto);
      expect(result).toEqual(expectedResult);
    });

    it('should handle minRepetitions', async () => {
      const submissions: TextSubmission[] = [
        { id: 1, content: 'hello world' },
        { id: 2, content: 'hello NestJS' },
        { id: 3, content: 'hello hello world' },
      ];
      const getReportDto: GetReportDto = { minRepetitions: 3 };
      const expectedResult = { hello: 4 };

      jest
        .spyOn(textSubmissionService, 'findAll')
        .mockResolvedValue(submissions);

      const result = await reportService.getMostCommonWords(getReportDto);
      expect(result).toEqual(expectedResult);
    });

    it('should handle both numberOfWords and minRepetitions', async () => {
      const submissions: TextSubmission[] = [
        { id: 1, content: 'hello world' },
        { id: 2, content: 'hello NestJS' },
        { id: 3, content: 'hello hello world' },
      ];
      const getReportDto: GetReportDto = {
        numberOfWords: 1,
        minRepetitions: 2,
      };
      const expectedResult = { hello: 4 };

      jest
        .spyOn(textSubmissionService, 'findAll')
        .mockResolvedValue(submissions);

      const result = await reportService.getMostCommonWords(getReportDto);
      expect(result).toEqual(expectedResult);
    });

    it('should return all words if no parameters are provided', async () => {
      const submissions: TextSubmission[] = [
        { id: 1, content: 'hello world' },
        { id: 2, content: 'hello NestJS' },
        { id: 3, content: 'hello hello world' },
      ];
      const getReportDto: GetReportDto = {};
      const expectedResult = { hello: 4, world: 2, nestjs: 1 };

      jest
        .spyOn(textSubmissionService, 'findAll')
        .mockResolvedValue(submissions);

      const result = await reportService.getMostCommonWords(getReportDto);
      expect(result).toEqual(expectedResult);
    });
  });
});
