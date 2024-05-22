import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  PuppeteerBaseModule,
  PuppeteerService,
} from '@back-end-fun-project/puppeteer-base';

@Module({
  imports: [
    PuppeteerBaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env', // Specify the path to your .env file
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PuppeteerService],
})
export class AppModule {}
