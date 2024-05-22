import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextSubmission } from '../entities/text-submission-entitiy';
import { CreateTextSubmissionDto } from '../dto/create-text-submission.dto';
import { ForbiddenContentException } from '../exceptions/forbidden-content.exception';

@Injectable()
export class TextSubmissionService {
  constructor(
    @InjectRepository(TextSubmission)
    private textSubmissionRepository: Repository<TextSubmission>
  ) {}

  async create(
    createTextSubmissionDto: CreateTextSubmissionDto
  ): Promise<TextSubmission> {
    const content = createTextSubmissionDto.content;

    // Reject if the content contains the word "the"
    if (/(\bthe\b)/i.test(content)) {
      throw new ForbiddenContentException();
    }

    const textSubmission = new TextSubmission();
    textSubmission.content = content;
    return this.textSubmissionRepository.save(textSubmission);
  }

  async findAll(): Promise<TextSubmission[]> {
    return this.textSubmissionRepository.find();
  }
}
