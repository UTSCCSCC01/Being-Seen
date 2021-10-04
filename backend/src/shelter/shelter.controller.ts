import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import * as mongoose from 'mongoose';
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

    @Post()
    async createShelter(@Body('name') name:string,
    @Body('address') address:string,
    @Body('postalCode') postalCode:string,
    @Body('phoneNumber') phoneNumber:string,
    @Body('email') email:string,
    @Body('description') description:string,
    @Body('hours') hours:string,
    @Body('tags') tags:string,
    @Body('picture') picture:string){
        const newId = await this.shelterService.createShelter(name,address,postalCode,phoneNumber,email,description,hours,tags,picture)
        return newId
    }

    
}
