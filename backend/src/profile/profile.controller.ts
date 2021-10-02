import { Controller, Get, Put } from '@nestjs/common'
import { ProfileService } from './profile.service'

@Controller('profiles')
export class ProfileController {
    constructor(private readonly profilesService: ProfileService) {}

    @Get('/:profileId')
    async getProfile(profileId: string) {
        const profile = await this.profilesService.getProfile(profileId);
        console.log(profile);
        return profile
    }

    @Get()
    async getAllProfiles(){
        const profiles = await this.profilesService.getAllProfiles();
        console.log(profiles);
        return profiles;
    }

}