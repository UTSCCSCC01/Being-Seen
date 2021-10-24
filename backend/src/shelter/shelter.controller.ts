import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Tag } from 'src/Schemas/tag.schema';
import { ShelterService } from './shelter.service';

@Controller('shelter')
export class ShelterController {

    constructor(private readonly shelterService: ShelterService){}
    /**
     * returns all shelters schemas within db
     * @returns all shelter schemas within db
     */
    @Get()
    async getShelters(){
        const shelters = await this.shelterService.getAllShelters()
        return shelters
    }
    /**
     * gets a shelter with given id from db
     * @param  shelterId - id of shelter to be retrieved from db
     * @returns schema of shelter given by shelterId
     */
    @Get("/:shelterId")
    async getShelterById(@Param("shelterId") shelterId: string){
        
        const shelter = await this.shelterService.getShelterById(shelterId);
        
        return shelter
    }

    /**
     * creates a shelter given the following params
     * @param name - name of new shelter
     * @param address -address of new shelter
     * @param postalCode -postal code of new shelter
     * @param phoneNumber - phone number of new shelter
     * @param email - email of new shelter
     * @param description - description of new shelter
     * @param hours - operating hours of new shelter
     * @param tags - tags used to describe new shelter
     * @param picture - http address for new shelter's picture
     * @returns 
     */
    @Post()
    async createShelter(@Body('name') name:string,
    @Body('address') address:string,
    @Body('postalCode') postalCode:string,
    @Body('phoneNumber') phoneNumber:string,
    @Body('email') email:string,
    @Body('description') description:string,
    @Body('hours') hours:string,
    @Body('tags') tags:string[],
    @Body('picture') picture:string){
        const newId = await this.shelterService.createShelter(name,address,postalCode,phoneNumber,email,description,hours,tags,picture)
        return newId
    }

    @Put()
    async searchShelter(@Body('tagList') tagList:string[]){
        let shelters = await this.shelterService.searchShelterByTags(tagList)
        return shelters
    }
    
}
