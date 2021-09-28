import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/objects/Review';
import { Shelter } from './shelter.model';

@Injectable()
export class ShelterService {

    constructor(@InjectModel("Shelter") private readonly shelterModel: Model<Shelter>){}

    async getAllShelters(){
        const shelters = await this.shelterModel.find().exec();
        return shelters as Shelter[];
    }

    async getShelterById(shelterId: string){
        const shelter = await this.findShelter(shelterId)
        return shelter
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
