import { Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { Shelter } from "../objects/Shelter"

@Controller('shelter')
export class ShelterController {
    @Get()
    getShelters(){
        //TODO: implement returning all shelters (or a set amt of shelters)
        return "all shelters from get"
    }

    @Get("/:shelterId")
    getShelterById(){
        //TODO: implement returning a shelter with a given id
        return "shelter with specific id from get"
    }

    @Put('/:shelterId')
    updateShelter(@Param() newShelter: Shelter){
        //TODO: Implement updating a given shelter
        return "put to shelter with given id"
    }
}
