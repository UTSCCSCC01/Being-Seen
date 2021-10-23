import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagDocument } from 'src/Schemas/tag.schema';

@Injectable()
export class TagService {
    constructor(@InjectModel("Tag") private readonly tagModel: Model<TagDocument>){}
    /**
     * Finds tag with given tag name from db
     * @param tagName name of tag to be found
     * @returns Tag with name tagName
     */
    async getTagByName(tagName:string){
        //const tag = await this.tagModel.findById(tagName)
        try{
            //finding by tagName returns an array: we return first element since tagName SHOULD be a primary key
            const tag = await this.tagModel.find().where('tagName').equals(tagName)
            //return first element in array, which should be only element
            return tag[0];
        }catch(error){
            throw new NotFoundException("Could not find tag with that name")
        }
        
    }
    /**
     * returns list of Tag objects correlating to each name in tagList
     * @param tagList list of tagNames to be found from database
     * @returns returns list of Tag objects correlating to each name in tagList
     */
    async getListOfTags(tagList:string[]){
        let listOfTags = []
        for(let i = 0; i < tagList.length; i++){
            try{
                let tagObj = await this.getTagByName(tagList[i])
                listOfTags.push(tagObj)
            }catch(error){}
            console.log(listOfTags)
        }
        return listOfTags
    }
    /**
     * creates Tag object in database with tagName name, if no such tag already exists
     * @param name 
     * @returns 
     */
    async createTag(name:string){
        let tagFound = await this.getTagByName(name)
        if(tagFound){
            return
        } 
        const TagJob = new this.tagModel({
            tagName:name
        })
        const result = await TagJob.save()
        return result._id
    }
    /**
     * Edits Tag with id of id to have tagName of name
     * @param id id of tag to be edited
     * @param name new name of tag
     */
    async editTagById(id:string, name:string){
        try{
            let tag = await this.tagModel.findById(id)
            tag.tagName = name
            let result = await tag.save()
            return result
        }catch(error){
            throw new NotFoundException("could not find tag")
        }
        
    }
}
