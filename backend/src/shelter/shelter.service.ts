import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, ObjectId, Schema, Types } from 'mongoose';
import { Review } from 'src/Schemas/review.schema';
import { Shelter, ShelterDocument } from '../Schemas/shelter.schema';

@Injectable()
export class ShelterService {

    constructor(@InjectModel("Shelter") private readonly shelterModel: Model<ShelterDocument>){}
    //returns all shelters
    async getAllShelters(){
        const shelters = await this.shelterModel.find().exec();
        return shelters as Shelter[];
    }

    //returns a shelter, given its id
    async getShelterById(shelterId: string){
        let shelter = await this.findShelter(shelterId)
        return shelter
    }
    
    async addShelterReview(shelterId: string, reviewer:string, content:string,
        rating:number){
        const shelter = await this.findShelterPrimitive(shelterId)
        shelter.reviews.push({reviewer:new Types.ObjectId(reviewer), content:content, rating: rating, date: new Date()})
        this.updateShelterScore(shelter)
    }

    async deleteShelterReview(shelterId: string, reviewerId: string){
        const shelter = await this.findShelterPrimitive(shelterId)
        const index = shelter.reviews.findIndex(review => review.reviewer == reviewerId)
        if(index > -1){
            shelter.reviews.splice(index,1)
        }
        this.updateShelterScore(shelter)
        return
    }

    async editShelterReview(shelterId:string, reviewerId: string, content:string, rating:string){
        const shelter = await this.findShelterPrimitive(shelterId)
        const index = shelter.reviews.findIndex(review => review.reviewer == reviewerId)
        if(index > -1){
            if(shelter.reviews[index].content){ 
                shelter.reviews[index].content = content;
            }
            if(shelter.reviews[index].rating){ 
                shelter.reviews[index].rating = rating;
            }
        }
        shelter.markModified("reviews")
        this.updateShelterScore(shelter)
        
        return
    }

    async createShelter(name:string, address:string, postalCode:string, phoneNumber:string, email:string,
    description:string, hours:string, tags:string, picture:string){
        let review = []
        let rating = []
        const newShelter = new this.shelterModel({
            name:name,
            address:address,
            postalCode:postalCode,
            phoneNumber:phoneNumber,
            email:email,
            description:description,
            hours:hours,
            tags: this.convertOidArr(tags),
            picture:picture
        })
        newShelter.save()
        return newShelter.id
    }


    // All Helper Functions Below This Line//
    //--------------------------------------------------------//
    //updates a shelter's score to match that of its revies
   private async updateShelterScore(shelter){
        if(shelter.reviews.length > 0){
            //if shelter has reviews
            let sum = 0;
            //tally score up
            for(var i = 0; i < shelter.reviews.length; i ++){
                sum += shelter.reviews[i].rating
            }
            //avg score and round to one digit then save it to rating
            shelter.rating = Math.round((sum / shelter.reviews.length) * 10) / 10
        }
        else{
            shelter.rating = 0
        }
        shelter.save()
    }

    //helper function used to find a shelter, given its id
    private async findShelter(shelterid: string): Promise<Shelter>{
        var shelter;
        //look up shelter by id in mongodb
        try{   
            shelter = await this.shelterModel.findById(shelterid);
        } catch(error){
            //if code is invalid throw an error
            throw new NotFoundException("Could not find shelter with that id");
        }
            //if doesn't exist throw error
        if (!shelter){
            throw new NotFoundException("Could not find shelter with that id");
        }
        return shelter
    }

    //helper function used to find a shelter, given its id while keeping some of its
    //properties from the model
    private async findShelterPrimitive(shelterid:string){
        var shelter;
        try{   
            shelter = await this.shelterModel.findById(shelterid);
        } catch(error){
            //if code is invalid throw an error
            throw new NotFoundException("Could not find shelter with that id");
        }
            //if doesn't exist throw error
        if (!shelter){
            throw new NotFoundException("Could not find shelter with that id");
        }
        return shelter
    }

    private convertOidArr(arr){
        for(let i = 0; i < arr.length; i++){
            arr[i] = Types.ObjectId(arr[i])
        }
        return arr
    }

}
