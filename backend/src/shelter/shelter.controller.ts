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
        
        const shelter = await this.shelterService.getShelterById(shelterId);
        
        return shelter
    }

    @Patch('/:shelterId')
    async updateShelter(@Param("shelterId") shelterId : string, 
    @Body('reviewer') reviewer:string,
    @Body('content') content:string,
    @Body('rating') rating:number){
        //get our shelter given its id
        await this.shelterService.addShelterReview(shelterId,reviewer,content,rating)
        return
    }

    
}
