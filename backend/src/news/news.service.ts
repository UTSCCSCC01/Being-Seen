import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsReal, NewsRealDocument } from 'src/Schemas/newsreal.schema';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('NewsReal')
    private readonly newsModel: Model<NewsRealDocument>,
  ) {}

  async getAllReels() {
    const news = await this.newsModel.find().exec();
    return news as NewsReal[];
  }

  async getNMostRecent(n: number) {
    const news = await this.newsModel
      .find()
      .sort({ date: -1 })
      .limit(Number(n));
    return news as NewsReal[];
  }

  async createNewsReel(headline: string, content: string, picture: string) {
    const newReel = new this.newsModel({
      headline,
      content,
      picture,
      date: new Date(),
    });
    await newReel.save();
    return newReel;
  }

  async updateNewsReel(
    newsId: string,
    headline: string,
    content: string,
    picture: string,
    date,
  ) {
    try {
      const newsReel = await this.newsModel.findById(newsId);
      if (headline) newsReel.headline = headline;
      if (content) newsReel.content = content;
      if (picture) newsReel.picture = picture;
      if (date) newsReel.date = new Date();

      await newsReel.save();
      return newsReel;
    } catch (error) {
      console.log(error);
    }
  }
}
