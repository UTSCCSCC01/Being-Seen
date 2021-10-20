import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {}

  /**
   * Find user by username
   * @param username Username query
   * @returns User object if found, null otherwise
   */
  async findOne(username: string) {
    return this.UserModel.find({username: username}).exec();
  }

  async UsersInfo() {
    // return await this.Users.find( {username: 'test'} ).exec();
  }
}