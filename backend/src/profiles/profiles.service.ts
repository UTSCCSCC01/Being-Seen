import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Schema, Types } from 'mongoose';

import { Profile, ProfileDocument } from './Schemas/profile.schema'

@Injectable()
export class ProfilesService {

  constructor(@InjectModel("Profile") private profileModel: Model<ProfileDocument>) {}

  async getAllProfiles() {
    const profiles = await this.profileModel.find().exec();
    return profiles;
  }
  
}
