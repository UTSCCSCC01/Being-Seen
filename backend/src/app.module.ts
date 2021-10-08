import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ShelterController } from './shelter/shelter.controller';
import { ShelterModule } from './shelter/shelter.module';
import { ShelterService } from './shelter/shelter.service';
import { ProfileModule } from './profile/profile.module'

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), ShelterModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
