import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { TextSubmissionService } from './text-submission.service';
import { CreateTextSubmissionDto } from '../dto/create-text-submission.dto';
import { LanguageGuard } from '../guards/language-guard';

@Controller('text-submission')
@UseGuards(LanguageGuard)
export class TextSubmissionController {
  constructor(private readonly textSubmissionService: TextSubmissionService) {}
  @Post()
  async create(@Body() createTextSubmissionDto: CreateTextSubmissionDto) {
    return this.textSubmissionService.create(createTextSubmissionDto);
  }

  @Get()
  async findAll() {
    return this.textSubmissionService.findAll();
  }
}
