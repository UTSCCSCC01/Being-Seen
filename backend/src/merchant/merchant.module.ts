import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from 'src/tag/tag.module';

import { Merchant, MerchantSchema } from '../Schemas/merchant.schema';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Merchant.name, schema: MerchantSchema },
    ]),
    TagModule,
  ],
  controllers: [MerchantController],
  providers: [MerchantService],
})
export class MerchantModule {}
