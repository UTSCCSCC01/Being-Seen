import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ShelterService } from '../shelter.service';

@Controller('shelter/:shelterId/review')
export class ReviewController {
    constructor(private readonly shelterService: ShelterService){}

    @Get()
    async getReviews(@Param("shelterId") shelterId:string){
        const reviews = (await this.shelterService.getShelterById(shelterId)).reviews
        return reviews
    }
    @Post('/:reviewerId')
    async addReview(@Param("shelterId") shelterId : string, 
    @Param('reviewerId') reviewer:string,
    @Body('content') content:string,
    @Body('rating') rating:number){
        //get our shelter given its id
        await this.shelterService.addShelterReview(shelterId,reviewer,content,rating)
        return
    }

    @Delete('/:reviewerId')
    async deleteReview(@Param("shelterId") shelterId:string, @Param("reviewerId") reviewerId:string){
        await this.shelterService.deleteShelterReview(shelterId, reviewerId)
        return
    }

    @Patch('/:reviewerId')
    async editReview(@Param("shelterId") shelterId:string, 
    @Param("reviewerId") reviewerId:string,
    @Body("content") content:string,
    @Body("rating") rating:string){
        await this.shelterService.editShelterReview(shelterId,reviewerId,content,rating)
    }
}
