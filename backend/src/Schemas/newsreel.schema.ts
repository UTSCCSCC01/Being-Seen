import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NewsReelDocument = NewsReel & Document;
@Schema()
export class NewsReel {
  @Prop()
  id: string;
  @Prop({ required: true })
  headline: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  content: string;
  @Prop({ default: 'https://c.tenor.com/d2-UHAzefXgAAAAi/pepe-cringe.gif' })
  picture: string;
  @Prop({ required: true })
  date: Date;
}

export const NewsSchema = SchemaFactory.createForClass(NewsReel);
