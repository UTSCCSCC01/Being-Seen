
import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelterSchema, Shelter } from '../Schemas/shelter.schema';
import { ShelterService } from './shelter.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Shelter.name, schema:ShelterSchema}])],
    controllers: [ShelterController],
    providers: [ShelterService]
})
export class ShelterModule {}
