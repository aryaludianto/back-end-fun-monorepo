import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('search')
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * Search text at Bing.com and returns Screen capture in base64
   * @param text
   * @returns base64String
   */
  @Get(':text')
  async searchBing(@Param('text') text: string): Promise<string> {
    return await this.appService.searchBing(text);
  }
}
