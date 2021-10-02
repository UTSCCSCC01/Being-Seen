import { Controller, Get } from '@nestjs/common'
import { ProfilesService } from './profiles.service'

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @Get('/:profileId')
    getProfile(profileId: string): any {

    }

    @Get()
    async getAllProfiles(){
        const profiles = await this.profilesService.getAllProfiles();
        console.log(profiles);
        return profiles;
    }
}