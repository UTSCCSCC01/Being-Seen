import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService){}

    @Get()
    async getAllEducationResources(){
        const educationResources = await this.educationService.getAllEducationResources()
        return educationResources
    }

    @Get(":/educationId")
    async getEducationResourceById(@Param("educationId") educationId:string){
        
    }

    @Post()
    async createEducationrResouce(@Body("name") name:string,
    @Body("description") description:string){
        const newId = await this.educationService.createEducationResource(name,description)
        return newId
    }
}
