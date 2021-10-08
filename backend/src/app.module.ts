import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { ShelterController } from './shelter/shelter.controller';
import { ShelterModule } from './shelter/shelter.module';
import { ShelterService } from './shelter/shelter.service';
import { ProfileModule } from './profile/profile.module';

import { ShelterController } from './shelter/shelter.controller';
import { ShelterModule } from './shelter/shelter.module';
import { ShelterService } from './shelter/shelter.service';
import { ProfileModule } from './profile/profile.module'

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), ShelterModule, ProfileModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
