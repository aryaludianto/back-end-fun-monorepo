import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { LanguageGuard } from '../guards/language-guard';
import { GetReportDto } from '../dto/get-report.dto';
import { ReportController } from './report-controller';

describe('ReportController', () => {
  let reportController: ReportController;
  let reportService: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        {
          provide: ReportService,
          useValue: {
            getMostCommonWords: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(LanguageGuard)
      .useValue({
        canActivate: jest.fn(() => true), // Mock the guard to always allow
      })
      .compile();

    reportController = module.get<ReportController>(ReportController);
    reportService = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(reportController).toBeDefined();
  });

  describe('getReport', () => {
    it('should call reportService.getMostCommonWords with the provided dto', async () => {
      const getReportDto: GetReportDto = {
        numberOfWords: 10,
        minRepetitions: 2,
      };
      const result = { word: 5 };

      jest.spyOn(reportService, 'getMostCommonWords').mockResolvedValue(result);

      expect(await reportController.getReport(getReportDto)).toBe(result);
      expect(reportService.getMostCommonWords).toHaveBeenCalledWith(
        getReportDto
      );
    });

    it('should handle missing parameters', async () => {
      const getReportDto: GetReportDto = {};
      const result = { word: 5 };

      jest.spyOn(reportService, 'getMostCommonWords').mockResolvedValue(result);

      expect(await reportController.getReport(getReportDto)).toBe(result);
      expect(reportService.getMostCommonWords).toHaveBeenCalledWith(
        getReportDto
      );
    });
  });
});
