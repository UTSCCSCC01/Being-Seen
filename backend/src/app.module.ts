import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EducationModule } from './education/education.module';
import { JobModule } from './jobresource/jobresource.module';
import { MerchantModule } from './merchant/merchant.module';
import { NewsModule } from './news/news.module';
import { ProfileModule } from './profile/profile.module';
import { ShelterModule } from './shelter/shelter.module';
import { TagModule } from './tag/tag.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    ShelterModule,
    ProfileModule,
    AuthModule,
    UsersModule,
    MerchantModule,
    EducationModule,
    JobModule,
    TagModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
