import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextSubmission } from '../entities/text-submission-entitiy';
import { TextSubmissionService } from '../text-submission/text-submission.service';
import { TextSubmissionController } from '../text-submission/text-submission-controller';
import { ReportService } from '../report/report.service';
import { ReportController } from '../report/report-controller';
import { LanguageGuard } from '../guards/language-guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensure the ConfigModule is globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [TextSubmission],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([TextSubmission]),
  ],
  controllers: [TextSubmissionController, ReportController],
  providers: [TextSubmissionService, ReportService, LanguageGuard],
})
export class AppModule {}
