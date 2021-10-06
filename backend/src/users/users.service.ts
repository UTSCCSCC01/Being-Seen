import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {}

  async findOne(username: string) {
    return this.UserModel.find({username: 'test'}).exec();
  }

  async UsersInfo() {
    // return await this.Users.find( {username: 'test'} ).exec();
  }
}