import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsReel, NewsReelDocument } from 'src/Schemas/newsreel.schema';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('NewsReel')
    private readonly newsModel: Model<NewsReelDocument>,
  ) {}
  /**
   * gets all news reels from db
   * @returns all news reels from db
   */
  async getAllReels() {
    const news = await this.newsModel.find().exec();
    return news as NewsReel[];
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
    return news as NewsReel[];
  }
  /**
   * creates new newsreel with given info
   * @param headline headline of newsreel
   * @param content content of newsreel
   * @param type type of post
   * @param picture picture associated with newsreel
   * @returns new newsreel as an object
   */
  async createNewsReel(
    headline: string,
    type: string,
    content: string,
    picture: string,
  ) {
    const newReel = new this.newsModel({
      headline,
      type,
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
   * @param type type of post
   * @param content new content of newsreel
   * @param picture new picture of newsreel
   * @param date new date of newsreel
   * @returns updated newsreel
   */
  async updateNewsReel(
    newsId: string,
    headline: string,
    type: string,
    content: string,
    picture: string,
    date,
  ) {
    try {
      const newsReel = await this.newsModel.findById(newsId);
      if (headline) newsReel.headline = headline;
      if (type) newsReel.type = type;
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
