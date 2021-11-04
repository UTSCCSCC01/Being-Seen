import { Body, Controller, Get, Param, Post, Put, Patch } from '@nestjs/common';

import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profilesService: ProfileService) {}

  /**
   * Get a list of all profiles in the database
   * @returns All profiles found
   */
  @Get()
  async getAllProfiles() {
    const profiles = await this.profilesService.getAllProfiles();
    console.log(profiles);
    return profiles;
  }

  /**
   * Return a profile with a matching id
   * @param id UserId to match with Users DB
   * @returns The profile with matching userId
   */
  @Get('/:userId')
  async getProfile(@Param('userId') userId: string) {
    const profile = await this.profilesService.getProfile(userId);
    console.log(profile);
    return profile;
  }

  /**
   * Create a new profile entry in database with given information
   * @param userId UserId to match with Users DB
   * @param name Name to be used
   * @param story Story to be used
   * @param balance Balance to be used
   * @returns Updated profile
   */
  @Post('/:userId')
  async postProfile(
    @Param('userId') userId: string,
    @Body('name') name: string,
    @Body('story') story: string,
    @Body('balance') balance: number,
  ) {
    const profile = await this.profilesService.postProfile(
      userId,
      name,
      story,
      balance,
    );
    console.log(profile);
    return profile;
  }

  /**
   * Update profile with matching id with a new story as user provided
   * @param userId UserId to match with Users DB
   * @param story Story to be replaced to
   * @returns Updated profile
   */
  @Put('/:userId')
  async putStory(
    @Param('userId') userId: string,
    @Body('story') story: string,
  ) {
    const profile = await this.profilesService.putStory(userId, story);
    console.log(profile);
    return profile;
  }
}
