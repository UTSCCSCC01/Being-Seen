import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EducationModule } from './education/education.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShelterModule } from './shelter/shelter.module';
import { ProfileModule } from './profile/profile.module';
import { MerchantModule } from './merchant/merchant.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
