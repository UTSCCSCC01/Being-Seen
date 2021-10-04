import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EducationResource, EducationResourceDocument } from 'src/Schema/educationresource.schema';

@Injectable()
export class EducationService {
    constructor(@InjectModel("EducationResource") private readonly educationModel: Model<EducationResourceDocument>){}

    async getAllEducationResources(){
        const resources = await this.educationModel.find().exec()
        return resources as EducationResource[]
    }
    
    async getEducationResourceById(educationId: string){
        const resource = await this.findEducation(educationId)
        return resource
    }

    async createEducationResource(name:string, description:string, website="", email="", phoneNumber="", tags=[]){
        const newEducation = new this.educationModel({
            name:name,
            description:description,
            tags:this.convertOidArr(tags),
            website:website,
            email:email,
            phoneNumber:phoneNumber
        })
        const result = await newEducation.save()
        return result.id
        
    }
//HELPER FUNCTIONS BELOW THIS LINE
//---------------------------------------------------
    private async findEducation(educationId: string): Promise<EducationResource>{
    var education;
    //look up shelter by id in mongodb
    try{   
        education = await this.educationModel.findById(educationId);
    } catch(error){
        //if code is invalid throw an error
        throw new NotFoundException("Could not find shelter with that id");
    }
        //if doesn't exist throw error
    if (!education){
        throw new NotFoundException("Could not find shelter with that id");
    }
    
    return education
    }

    async deleteProduct(educationId: string) {
        const result = await this.educationModel.deleteOne({_id: educationId}).exec();
        if (result.n === 0) {
          throw new NotFoundException('Could not find product.');
        }
    }

    private convertOidArr(arr){
        for(let i = 0; i < arr.length; i++){
            arr[i] = Types.ObjectId(arr[i])
        }
        return arr
    }
}
