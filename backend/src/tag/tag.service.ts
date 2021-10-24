import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Service } from 'src/Schemas/service.schema';
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
        let name = tagName.replace(" ", "_")
        //const tag = await this.tagModel.findById(tagName)
        try{
            //finding by tagName returns an array: we return first element since tagName SHOULD be a primary key
            const tag = await this.tagModel.find().where('tagName').equals(name)
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
        }
        return listOfTags
    }
    /**
     * creates Tag object in database with tagName name, if no such tag already exists
     * @param tagName name of tag to be created if it doesnt not exist 
     * @returns created tag or tag that already exists with tagName of tagName
     */
    async createTag(tagName:string){
        let name = tagName.replace(" ", "_")
        let tagFound = await this.getTagByName(name)
        if(tagFound){
            return tagFound
        } 
        const TagJob = new this.tagModel({
            tagName:name
        })
        const result = await TagJob.save()
        return result
    }
    /**
     * creates a tag Object within for each entry in tagList (if it doesn't already exist) and returns list of said tag objects
     * @param tagList list containing names of tags to be created
     * @returns list of tag objects that have been created within db
     */
    async createTagList(tagList: string[]){
        let retList = []
        for(let i = 0; i < tagList.length; i++){
            let result = await this.createTag(tagList[i])
            retList.push(result)
        }
        return retList
    }
    /**
     * Edits Tag with id of id to have tagName of name
     * @param id id of tag to be edited
     * @param tagName new name of tag
     */
    async editTagById(id:string, tagName:string){
        let name = tagName.replace(" ", "_")
        try{
            let tag = await this.tagModel.findById(id)
            tag.tagName = name
            let result = await tag.save()
            return result
        }catch(error){
            throw new NotFoundException("could not find tag")
        }
        
    }
    /**
     * Returns a list of schemas given by model that contain all tags within tagList
     * @param tagList list of tags to search for
     * @param model model of schema to search for
     * @returns all objects within model schema that contain all tags within tagList
     */
    async searchForObjectsWithTags(tagList: string[], model){
        let listOfTags
        if(tagList.length == 0){
            listOfTags = await model.find().exec()
            return listOfTags;
        }
        listOfTags = await this.getListOfTags(tagList)
        let listOfModels = await model.find({ tags: { $all: listOfTags } } ).exec()
        return listOfModels;
    }
}
