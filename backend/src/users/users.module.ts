import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';

import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'users',
      },
    ]),
    ProfileModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
