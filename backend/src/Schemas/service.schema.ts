import { Prop, Schema } from '@nestjs/mongoose';

import { Tag } from './tag.schema';

@Schema()
export class Service {
  @Prop()
  id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ default: [] })
  tags: Tag[];
}
