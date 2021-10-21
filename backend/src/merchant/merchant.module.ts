import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelterService } from 'src/shelter/shelter.service';
import { MerchantSchema, Merchant } from '../Schemas/merchant.schema';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Merchant.name, schema: MerchantSchema },
    ]),
  ],
  controllers: [MerchantController],
  providers: [MerchantService],
})
export class MerchantModule {}
