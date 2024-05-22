import { Module } from '@nestjs/common';
import { PuppeteerService } from './puppeteer-service';

@Module({
  controllers: [],
  providers: [PuppeteerService],
  exports: [],
})
export class PuppeteerBaseModule {}
