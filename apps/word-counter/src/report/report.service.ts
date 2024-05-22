import { Injectable } from '@nestjs/common';
import { TextSubmissionService } from '../text-submission/text-submission.service';
import { GetReportDto } from '../dto/get-report.dto';

@Injectable()
export class ReportService {
  constructor(private readonly textSubmissionService: TextSubmissionService) {}

  async getMostCommonWords(
    getReportDto: GetReportDto
  ): Promise<{ [word: string]: number }> {
    const submissions = await this.textSubmissionService.findAll();
    const wordCounts: { [word: string]: number } = {};

    submissions.forEach((submission) => {
      const words = submission.content
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/);

      words.forEach((word) => {
        if (wordCounts[word]) {
          wordCounts[word]++;
        } else {
          wordCounts[word] = 1;
        }
      });
    });

    let filteredWordCounts = wordCounts;

    if (getReportDto.minRepetitions !== undefined) {
      filteredWordCounts = Object.fromEntries(
        Object.entries(wordCounts).filter(
          ([, count]) => count >= getReportDto.minRepetitions
        )
      );
    }

    const sortedWordCounts = Object.entries(filteredWordCounts).sort(
      ([, a], [, b]) => b - a
    );

    if (getReportDto.numberOfWords !== undefined) {
      return Object.fromEntries(
        sortedWordCounts.slice(0, getReportDto.numberOfWords)
      );
    }

    return Object.fromEntries(sortedWordCounts);
  }
}
