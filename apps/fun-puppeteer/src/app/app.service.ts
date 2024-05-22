import { PuppeteerService } from '@back-end-fun-project/puppeteer-base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private puppeteerService: PuppeteerService,
    private configService: ConfigService
  ) {}

  /**
   * Search Text in Bing.com and return the Screen capture
   *
   * @param query
   * @returns string
   */
  async searchBing(query: string): Promise<string> {
    // headless: false when in development
    const headless =
      this.configService.get<string>('NODE_ENV') === 'development'
        ? false
        : true;
    // Launch a new browser instance
    const browser = await this.puppeteerService.newBrowser(headless);

    // Create a new page
    const page = await browser.newPage();

    // Navigate to Bing (doesn't have the cookies acceptantie blocking)
    await page.goto('https://www.bing.com', { waitUntil: 'networkidle2' });

    // Wait for the search box to be available and type the search query
    await page.waitForSelector('textarea#sb_form_q');
    await page.type('textarea#sb_form_q', query);

    // Submit the search form
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    const screenShot: string = await page.screenshot({
      encoding: 'base64',
      fullPage: true,
    });

    // Close the browser
    await browser.close();

    return screenShot;
  }
}
