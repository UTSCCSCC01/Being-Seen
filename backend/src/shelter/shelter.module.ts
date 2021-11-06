import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from 'src/tag/tag.module';

import { Shelter, ShelterSchema } from '../Schemas/shelter.schema';
import { ReviewController } from './review/review.controller';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shelter.name, schema: ShelterSchema }]),
    TagModule,
  ],
  controllers: [ShelterController, ReviewController, ReviewController],
  providers: [ShelterService],
})
export class ShelterModule {}
