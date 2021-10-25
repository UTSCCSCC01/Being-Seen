import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Service } from './service.schema';

@Schema()
export class Merchant extends Service {
  @Prop({ required: true })
  address: string;
  @Prop({ default: '' })
  hours: string;
  @Prop({ default: 'https://reactnative.dev/img/tiny_logo.png' })
  picture: string;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
export type MerchantDocument = Merchant & Document;
