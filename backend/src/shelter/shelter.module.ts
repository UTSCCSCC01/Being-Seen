
import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelterSchema } from './shelter.model';
import { ShelterService } from './shelter.service';

@Module({
    imports: [MongooseModule.forFeature([{name: "Shelter", schema:ShelterSchema}])],
    controllers: [ShelterController],
    providers: [ShelterService]
})
export class ShelterModule {}
