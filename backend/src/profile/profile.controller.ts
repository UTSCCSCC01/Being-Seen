import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common'
import { ProfileService } from './profile.service'

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profilesService: ProfileService) {}

    @Get()
    async getAllProfiles(){
        const profiles = await this.profilesService.getAllProfiles();
        console.log(profiles);
        return profiles;
    }

    @Get('/:id')
    async getProfile( @Param('id') id: string ) {
        const profile = await this.profilesService.getProfile(id);
        console.log(profile);
        return profile
    }

    @Post()
    async postProfile( 
        @Body('name') name: string, 
        @Body('story') story: string, 
        @Body('balance') balance: number) {
        const profile = await this.profilesService.postProfile(name, story, balance);
        console.log(profile);
        return profile;
    }
    
    @Put('/:id')
    async putStory( 
        @Param('id') id: string, 
        @Body('story') story: string) {
        const profile = await this.profilesService.putStory(id, story);
        console.log(profile);
        return profile;
    }

}