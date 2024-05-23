import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TextSubmission } from '../entities/text-submission-entitiy';
import { CreateTextSubmissionDto } from '../dto/create-text-submission.dto';
import { ForbiddenContentException } from '../exceptions/forbidden-content.exception';

@Injectable()
export class TextSubmissionService {
  private forbiddenWords: string[];

  constructor(
    @InjectRepository(TextSubmission)
    private textSubmissionRepository: Repository<TextSubmission>,
    private configService: ConfigService
  ) {
    const configForbiddenWords =
      this.configService.get<string>('FORBIDDEN_WORDS').split(',') || [];
    this.forbiddenWords = [...configForbiddenWords];
  }

  async create(
    createTextSubmissionDto: CreateTextSubmissionDto
  ): Promise<TextSubmission> {
    const content = createTextSubmissionDto.content;

    // Check for forbidden words in the content
    for (const word of this.forbiddenWords) {
      const regex = new RegExp(`(\\b${word}\\b)`, 'i');
      if (regex.test(content)) {
        throw new ForbiddenContentException(word);
      }
    }

    const textSubmission = new TextSubmission();
    textSubmission.content = content;
    return this.textSubmissionRepository.save(textSubmission);
  }

  async findAll(): Promise<TextSubmission[]> {
    return this.textSubmissionRepository.find();
  }
}
