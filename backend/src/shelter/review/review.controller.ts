import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { ShelterService } from '../shelter.service';

@Controller('shelter/:shelterId/review')
export class ReviewController {
    constructor(private readonly shelterService: ShelterService){}
    /**
     *  returns schemas of all the reviews written for shelter
     * @param shelterId - id of shelter to get all reviews from
     * @returns schema of all reviews of shelter
     */
    @Get()
    async getReviews(@Param("shelterId") shelterId:string){
        const reviews = (await this.shelterService.getShelterById(shelterId)).reviews
        return reviews
    }
    /**
     * 
     * @param shelterId id of shelter for which the review is written
     * @param reviewer id of user who wrote the review
     * @returns reviewe that corresponds with shelter and reviewer, if it exists
     */
    @Get('/:reviewerId')
    async getReviewById(@Param('shelterId') shelterId: string, @Param('reviewerId') reviewer: string){
        const review = await this.shelterService.getShelterReviewById(shelterId, reviewer);
        if(review == undefined){
            throw new NotFoundException("review does not exist")
        }
        return review
    }
    /**
     * Addes a review to a given shelter
     * @param shelterId - id of shelter to write the review for
     * @param reviewer - author of review
     * @param content - content of review
     * @param rating - rating of review
     * @returns null
     */
    @Post('/:reviewerId')
    async addReview(@Param("shelterId") shelterId : string, 
    @Param('reviewerId') reviewer:string,
    @Body('content') content:string,
    @Body('rating') rating:number){
        //get our shelter given its id
        console.log("content: " + content)
        console.log("rating: " + rating)
        await this.shelterService.addShelterReview(shelterId,reviewer,content,rating)
        return
    }
    /**
     * deletes a review from a given shelter
     * @param shelterId id of shelter to delete review from
     * @param reviewerId id of author of review to be deleted
     * @returns 
     */
    @Delete('/:reviewerId')
    async deleteReview(@Param("shelterId") shelterId:string, @Param("reviewerId") reviewerId:string){
        await this.shelterService.deleteShelterReview(shelterId, reviewerId)
        return
    }
    /**
     * edits a review written for shelter
     * @param shelterId - id of shelter review was made for
     * @param reviewerId - id of author of review
     * @param content - new contents of review
     * @param rating - new rating of review
     */
    @Patch('/:reviewerId')
    async editReview(@Param("shelterId") shelterId:string, 
    @Param("reviewerId") reviewerId:string,
    @Body("content") content:string,
    @Body("rating") rating:number){
        await this.shelterService.editShelterReview(shelterId,reviewerId,content,rating)
    }
}
