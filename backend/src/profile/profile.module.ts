import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileSchema, Profile } from './Schemas/profile.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [MongooseModule.forFeature([{name: Profile.name, schema:ProfileSchema}])],
    controllers: [ProfileController],
    providers: [ProfileService]
})
export class ProfileModule {}