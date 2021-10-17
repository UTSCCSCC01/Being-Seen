import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelterService } from 'src/shelter/shelter.service';
import { MerchantSchema, Merchant } from '../Schemas/Merchant.schema';
import { MerchantController } from './merchant.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Merchant.name, schema: MerchantSchema },
    ]),
  ],
  controllers: [MerchantController],
  providers: [ShelterService],
})
export class MerchantModule {}
