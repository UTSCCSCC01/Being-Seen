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

  async postProfile(name: string, story: string, balance: number) {
    const newProfile = new this.profileModel({
      name,
      story, 
      balance
    });
    return await this.profileModel.create(newProfile);
  }

  async putStory(id: string, story: string) {
    var profile = await this.profileModel.findById(id);
    profile.story = story;
    return profile.save()
  }
  
}
