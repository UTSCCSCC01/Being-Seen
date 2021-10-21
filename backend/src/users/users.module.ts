import { Module } from '@nestjs/common';
import { User, UserSchema } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema,
    collection: 'users'
  }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
