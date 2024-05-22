import { Injectable } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';

@Injectable()
/**
 * Puppeteer wrapper to use Puppeteer as we want.
 */
export class PuppeteerService {
  async newBrowser(headless: boolean): Promise<Browser> {
    // Launch a new browser instance
    return await puppeteer.launch({ headless }); // headless: false to watch the browser actions
  }
}
