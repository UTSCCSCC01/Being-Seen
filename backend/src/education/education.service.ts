import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationResource, EducationResourceDocument } from 'src/Schema/educationresource.schema';

@Injectable()
export class EducationService {
    constructor(@InjectModel("EducationResource") private readonly educationModel: Model<EducationResourceDocument>){}

    async getAllEducationResources(){
        const resources = await this.educationModel.find().exec()
        return resources as EducationResource[]
    }

    async createEducationResource(name:string, description:string, website="", email="", phoneNumber="" ){
        const newEducation = new this.educationModel({
            name,
            description,
            website,
            email,
            phoneNumber
        })
        const result = await newEducation.save()
        return result.id
        
    }
}
