
import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelterSchema, Shelter } from '../Schemas/shelter.schema';
import { ShelterService } from './shelter.service';
import { ReviewController } from './review/review.controller';
import { TagModule } from 'src/tag/tag.module';

@Module({
    imports: [MongooseModule.forFeature([{name: Shelter.name, schema:ShelterSchema}]), TagModule],
    controllers: [ShelterController, ReviewController, ReviewController],
    providers: [ShelterService]
})
export class ShelterModule {}
