import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService){}

    @Get()
    async getAllEducationResources(){
        const educationResources = await this.educationService.getAllEducationResources()
        return educationResources
    }

    @Get("/:educationId")
    async getEducationResourceById(@Param("educationId") educationId:string){
        const resource = this.educationService.getEducationResourceById(educationId)
        return resource
    }



    @Put()
    async createEducationResource(@Body("name") name:string,
    @Body("description") description:string,
    @Body('website') website:string,
    @Body('email') email:string,
    @Body('phoneNumber') phoneNumber:string,
    @Body('tags') tags:string[]){
        const newId = await this.educationService.createEducationResource(name,description,website,email,phoneNumber,tags)
        return newId
    }

    @Delete("/:educationId")
    async deleteResourceById(@Param('educationId') educationId:string){
        await this.educationService.deleteProduct(educationId)
        return
    }
}
