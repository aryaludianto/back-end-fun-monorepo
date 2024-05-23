import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextSubmission } from '../entities/text-submission-entitiy';
import { TextSubmissionService } from '../text-submission/text-submission.service';
import { TextSubmissionController } from '../text-submission/text-submission-controller';
import { ReportService } from '../report/report.service';
import { ReportController } from '../report/report-controller';
import { LanguageGuard } from '../guards/language-guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
