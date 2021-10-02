import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ProfileSchema, Profile } from './Schemas/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [MongooseModule.forFeature([{name: Profile.name, schema:ProfileSchema}])],
    controllers: [ProfilesController],
    providers: [ProfilesService]
})
export class ShelterModule {}