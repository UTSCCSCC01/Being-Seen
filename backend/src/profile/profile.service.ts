import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Schema, Types } from 'mongoose';

import { Profile, ProfileDocument } from './Schemas/profile.schema'

@Injectable()
export class ProfileService {

  constructor(@InjectModel("Profile") private readonly profileModel: Model<ProfileDocument>) {}

  async getProfile(id: string ) {
    return await this.profileModel.findById(id);
  }

  async getAllProfiles() {
    return await this.profileModel.find().exec();
  }

  async putProfile(name: string) {
    return await new this.profileModel({ name: name }).save();
  }
  
}
