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
  /**
   * gets all news reels from db
   * @returns all news reels from db
   */
  async getAllReels() {
    const news = await this.newsModel.find().exec();
    return news as NewsReal[];
  }
  /**
   * gets n most recent news reels from db
   * @param n the number of most recent newsreels wanted
   * @returns n most recent news reels from db
   */
  async getNMostRecent(n: number) {
    const news = await this.newsModel
      .find()
      .sort({ date: -1 })
      .limit(Number(n));
    return news as NewsReal[];
  }
  /**
   * creates new newsreel with given info
   * @param headline headline of newsreel
   * @param content content of newsreel
   * @param picture picture associated with newsreel
   * @returns new newsreel as an object
   */
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
  /**
   * updates newsreel with id of newsId to have given info
   * @param newsId id of newsreel in db
   * @param headline new headline of newsreel
   * @param content new content of newsreel
   * @param picture new picture of newsreel
   * @param date new date of newsreel
   * @returns updated newsreel
   */
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
