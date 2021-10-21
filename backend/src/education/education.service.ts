import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EducationResource, EducationResourceDocument } from 'src/Schema/educationresource.schema';

@Injectable()
export class EducationService {
    constructor(@InjectModel("EducationResource") private readonly educationModel: Model<EducationResourceDocument>){}
    /**
     * Returns all education resources from db
     * @returns all education resrouces from db
     */
    async getAllEducationResources(){
        const resources = await this.educationModel.find().exec()
        return resources as EducationResource[]
    }
    /**
     * returns education resource given by education id
     * @param educationId - id of education resource to be searched for
     * @returns education resource of given id
     */
    async getEducationResourceById(educationId: string){
        const resource = await this.findEducation(educationId)
        return resource
    }
    /**
     * Creates/modifies education resource within db
     * @param name - new name of resource
     * @param description  new description of resource
     * @param website new website of resource
     * @param email new email of resource
     * @param phoneNumber new phone number of resource
     * @param tags new tags used to describe resource
     * @returns id of new/modified resource
     */
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
    /**
     * deletes education resource of given id
     * @param educationId - id of resource to be deleted
     */
    async deleteEducationResource(educationId: string) {
        const result = await this.educationModel.deleteOne({_id: educationId}).exec();
        if (result.n === 0) {
          throw new NotFoundException('Could not find resource.');
        }
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

    private convertOidArr(arr){
        try{
            for(let i = 0; i < arr.length; i++){
                arr[i].id = Types.ObjectId(arr[i].id)
            }
            return arr
        }catch(error){
            return []
        }
    }
}
