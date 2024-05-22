import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { GetReportDto } from '../dto/get-report.dto';
import { LanguageGuard } from '../guards/language-guard';

@Controller('report')
@UseGuards(LanguageGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReport(@Query() getReportDto: GetReportDto) {
    return this.reportService.getMostCommonWords(getReportDto);
  }
}
