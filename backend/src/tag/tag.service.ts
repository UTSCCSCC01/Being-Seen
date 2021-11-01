import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { model, Model } from 'mongoose';
import { Tag, TagDocument } from 'src/Schemas/tag.schema';

@Injectable()
export class TagService {
  constructor(
    @InjectModel('Tag') private readonly tagModel: Model<TagDocument>,
  ) {}
  /**
   * Finds tag with given tag name from db
   * @param tagName name of tag to be found
   * @returns Tag with name tagName
   */
  async getTagByName(tagName: string) {
    const name = this.cleanTag(tagName)
    //const tag = await this.tagModel.findById(tagName)
    try {
      //finding by tagName returns an array: we return first element since tagName SHOULD be a primary key
      const tag = await this.tagModel.findOne().where('tagName').equals(name);
      return tag;
    } catch (error) {
      throw new NotFoundException('Could not find tag with that name');
    }
  }
  /**
   * returns list of Tag objects correlating to each name in tagList
   * @param tagList list of tagNames to be found from database
   * @returns returns list of Tag objects correlating to each name in tagList
   */
  async getListOfTags(tagList: string[]) {
    const listOfTags = [];
    for (let i = 0; i < tagList.length; i++) {
      try {
        const tagObj = await this.getTagByName(tagList[i]);
        listOfTags.push(tagObj);
      } catch (error) {
        console.error(error);
      }
    }
    return this.prepTagList(listOfTags);
  }
  /**
   * creates Tag object in database with tagName name, if no such tag already exists
   * @param tagName name of tag to be created if it doesnt not exist
   * @returns created tag or tag that already exists with tagName of tagName
   */
  async createTag(tagName: string) {
    const name = this.cleanTag(tagName)
    const tagFound = await this.getTagByName(name);
    if (tagFound) {
      return tagFound;
    }
    const TagJob = new this.tagModel({
      tagName: name,
    });
    const result = await TagJob.save();
    return this.prepTag(result);
  }
  /**
   * creates a tag Object within for each entry in tagList (if it doesn't already exist) and returns list of said tag objects
   * @param tagList list containing names of tags to be created
   * @returns list of tag objects that have been created within db
   */
  async createTagList(tagList: string[]) {
    const retList = [];
    for (let i = 0; i < tagList.length; i++) {
      const result = await this.createTag(tagList[i]);
      retList.push(result);
    }
    return this.prepTagList(retList);
  }
  /**
   * Edits Tag with id of id to have tagName of name
   * @param id id of tag to be edited
   * @param tagName new name of tag
   */
  async editTagById(id: string, tagName: string) {
    const name = this.cleanTag(tagName)
    try {
      const tag = await this.tagModel.findById(id);
      tag.tagName = name;
      const result = await tag.save();
      return this.prepTag(result);
    } catch (error) {
      throw new NotFoundException('could not find tag');
    }
  }
  /**
   * Returns a list of schemas given by model that contain all tags within tagList
   * @param tagList list of tags to search for
   * @param model model of schema to search for
   * @returns all objects within model schema that contain all tags within tagList
   */
  async searchForObjectsWithTags(tagList: string[], model) {
    let listOfTags;
    if (tagList.length == 0) {
      listOfTags = await model.find().exec();
      return listOfTags;
    }
    listOfTags = await this.getListOfTags(this.cleanTagList(tagList));
    let listOfModels = await model
      .find({ tags: { $all: listOfTags } })
      .exec();
    return this.prepListOfModels(listOfModels);
  }

  /**
   * Helper functions below this line
   */
  private cleanTagList(tagList: string[]){
    let cleanedTags = []
    for(let i = 0; i < tagList.length; i++){
      cleanedTags.push(this.cleanTag(tagList[i]))
    }
    return cleanedTags
  }

  private cleanTag(tag: string){
    
    //clean leading/trailing whitespace
    let cleanTag = tag.trim()
    //store everything as fully uppercase
    cleanTag = cleanTag.toUpperCase();
    return cleanTag;
  }

  private prepTagList(tagList: Tag[]){
    console.log(tagList)
    for(let i = 0; i < tagList.length; i++){
      if(tagList[i] != null){
        tagList[i] = this.prepTag(tagList[i])
      }
    }
    return tagList
  }

  private prepTag(tag: Tag){
    if(tag == null || tag == undefined) return;
    let preppedTag = this.capitalize(tag.tagName);
    preppedTag = preppedTag.replace("_", " ")
    
    tag.tagName = preppedTag
    return tag
  }
  private capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  private prepListOfModels(modelList){
    for(let i = 0; i < modelList.length; i++){
      modelList[i].tags = this.prepTagList(modelList[i].tags)
    }
    return modelList
  }
}
