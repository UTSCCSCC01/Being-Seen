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
  @Get('/:id')
  async getProfile(@Param('id') id: string) {
    const profile = await this.profilesService.getProfile(id);
    console.log(profile);
    return profile;
  }

  /**
   * Create a new profile entry in database with given information
   * @param name
   * @param story
   * @param balance
   * @returns
   */
  @Post()
  async postProfile(
    @Body('name') name: string,
    @Body('story') story: string,
    @Body('balance') balance: number,
  ) {
    const profile = await this.profilesService.postProfile(
      name,
      story,
      balance,
    );
    console.log(profile);
    return profile;
  }

  /**
   * Update profile with matching id with a new story as user provided
   * @param id
   * @param story
   * @returns
   */
  @Put('/:id')
  async putStory(@Param('id') id: string, @Body('story') story: string) {
    const profile = await this.profilesService.putStory(id, story);
    console.log(profile);
    return profile;
  }
}
