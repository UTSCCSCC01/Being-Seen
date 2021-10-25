import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Review extends mongoose.Document {
  @Prop()
  reviewer: mongoose.Schema.Types.ObjectId;
  @Prop()
  content: string;
  @Prop({ required: true })
  rating: number;
  @Prop()
  date: Date;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
