import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Review } from 'src/objects/Review';
import { Shelter, ShelterDocument } from '../Schemas/shelter.schema';

@Injectable()
export class ShelterService {

    constructor(@InjectModel("Shelter") private readonly shelterModel: Model<ShelterDocument>){}

    async getAllShelters(){
        const shelters = await this.shelterModel.find().exec();
        return shelters as Shelter[];
    }

    async getShelterById(shelterId: string){
        let shelter = await this.findShelter(shelterId)
        return shelter
    }

    async insertShelter(name:string, address:string, postalCode:string, phoneNumber:string, email:string,
        description: string, hours: string){
       const newShelter = new this.shelterModel({
           name,
           address,
           postalCode,
           phoneNumber,
           email,
           description,
           hours
       })
       const result = await newShelter.save()
       return result.id
   }

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
        return shelter as Shelter
    }

    
}
