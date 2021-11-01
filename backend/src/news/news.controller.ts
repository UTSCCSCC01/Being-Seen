import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  /**
   * gets all news reels for db
   * @returns all news reels located in db
   */
  @Get()
  async getAllReels() {
    const newsReels = await this.newsService.getAllReels();
    return newsReels;
  }

  /**
   * returns n most recent news reel from db
   * @param numRecent the number of recent news reels wanted
   * @returns numRecent most recent news reels
   */
  @Get('/:numRecent')
  async getNMostRecentReels(@Param('numRecent') numRecent: number) {
    const newsReels = await this.newsService.getNMostRecent(numRecent);
    return newsReels;
  }
  /**
   * creates a new news reel in db
   * @param headline headline of new newsreel
   * @param content content of new newsreel
   * @param picture picture associated with new newreel
   * @returns new newsreel object, associated with one created in db
   */
  @Post()
  async createNewsReel(
    @Body('headline') headline: string,
    @Body('content') content: string,
    @Body('picture') picture: string,
  ) {
    const newReel = await this.newsService.createNewsReel(
      headline,
      content,
      picture,
    );
    return newReel;
  }
  /**
   * updates newsReel with id newsId to have new information
   * @param newsId id of newsreel in db
   * @param headline new headline of newsreel
   * @param content new content of newsreel
   * @param picture new picture of newsreel
   * @param date new date of newsreel
   * @returns updated newsreel
   */
  @Patch('/:newsId')
  async updateNewsReel(
    @Param('newsId') newsId: string,
    @Body('headline') headline: string,
    @Body('content') content: string,
    @Body('picture') picture: string,
    @Body('date') date: boolean,
  ) {
    const updatedReel = await this.newsService.updateNewsReel(
      newsId,
      headline,
      content,
      picture,
      date,
    );
    return updatedReel;
  }
}
