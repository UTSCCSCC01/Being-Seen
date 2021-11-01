import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async getAllReels() {
    const newsReels = await this.newsService.getAllReels();
    return newsReels;
  }

  @Get('/:numRecent')
  async getNMostRecentReels(@Param('numRecent') numRecent: number) {
    const newsReels = await this.newsService.getNMostRecent(numRecent);
    return newsReels;
  }

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
