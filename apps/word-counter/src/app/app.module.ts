import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextSubmission } from '../entities/text-submission-entitiy';
import { TextSubmissionService } from '../text-submission/text-submission.service';
import { TextSubmissionController } from '../text-submission/text-submission-controller';
import { ReportService } from '../report/report.service';
import { ReportController } from '../report/report-controller';
import { LanguageGuard } from '../guards/language-guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [TextSubmission],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TextSubmission]),
  ],
  controllers: [TextSubmissionController, ReportController],
  providers: [TextSubmissionService, ReportService, LanguageGuard],
})
export class AppModule {}
