import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProfileDocument } from './Schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  /**
   * Get a profile from database by matching given id
   * @param id The id to search for
   *
   */
  async getProfile(id: string) {
    return await this.profileModel.findById(id);
  }

  /**
   * Get all profiles in database
   * @returns
   */
  async getAllProfiles() {
    return await this.profileModel.find().exec();
  }

  /**
   * Insert new profile entries with the given parameters
   * @param name Name of the new profile
   * @param story The story associated with new profile
   * @param balance The balance to start for the new profile
   * @returns
   */
  async postProfile(name: string, story: string, balance: number) {
    const newProfile = new this.profileModel({
      name,
      story,
      balance,
    });
    return await this.profileModel.create(newProfile);
  }

  /**
   * Updates the story of the profile in database
   * @param id The id of the profile to update
   * @param story The story to update to
   * @returns
   */
  async putStory(id: string, story: string) {
    const profile = await this.profileModel.findById(id);
    profile.story = story;
    return profile.save();
  }
}
