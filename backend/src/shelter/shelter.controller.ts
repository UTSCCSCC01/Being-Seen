import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ShelterService } from './shelter.service';

@Controller('shelter')
export class ShelterController {
    constructor(private readonly shelterService: ShelterService){}
    @Get()
    async getShelters(){
        const shelters = await this.shelterService.getAllShelters()
        console.log(shelters)
        return shelters
    }

    @Get("/:shelterId")
    async getShelterById(@Param("shelterId") shelterId: string){
        //TODO: implement returning a shelter with a given id
        const shelter = await this.shelterService.getShelterById(shelterId);
        console.log(shelter)
        return shelter
    }

    @Put('/:shelterId')
    updateShelter(@Param("shelterId") shelterId : string, @Body() body){
        //TODO: Implement updating a given shelter
        //Gets shelterId, locates a shelter with that same ID in db
        //then updates it with given info
        return JSON.stringify(body)
    }

    @Post()
    async addShelter(
        @Body("name") name:string,
        @Body("address") address:string,
        @Body("postalCode") postalCode:string,
        @Body("phoneNumber") phoneNumber:string,
        @Body("email") email:string,
        @Body("description") description:string,
        @Body("hours") hours:string
    ){
        const newId = await this.shelterService.insertShelter(name,address,postalCode,
            phoneNumber, email, description, hours)

        return {id: newId}

    }
}
