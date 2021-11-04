import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profilesService: ProfileService) {}

  /**
   * Get a list of all profiles in the database
   * @returns Promise
   */
  @Get()
  async getAllProfiles() {
    const profiles = await this.profilesService.getAllProfiles();
    console.log(profiles);
    return profiles;
  }

  /**
   * Return a profile with a matching id
   * @param id
   * @returns
   */
  @Get('/:userId')
  async getProfile(@Param('userId') userId: string) {
    const profile = await this.profilesService.getProfile(userId);
    console.log(profile);
    return profile;
  }

  /**
   * Create a new profile entry in database with given information
   * @param userId
   * @param name
   * @param story
   * @param balance
   * @returns
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
   * @param userId
   * @param story
   * @returns
   */
  @Put('/:userId')
  async putStory(@Param('userId') userId: string, @Body('story') story: string) {
    const profile = await this.profilesService.putStory(userId, story);
    console.log(profile);
    return profile;
  }
}
