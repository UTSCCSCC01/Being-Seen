import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EducationModule } from './education/education.module';
import { ShelterController } from './shelter/shelter.controller';
import { ShelterModule } from './shelter/shelter.module';
import { ShelterService } from './shelter/shelter.service';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), EducationModule],
  controllers: [AppController],
  providers: [AppService],
})

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), ShelterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
