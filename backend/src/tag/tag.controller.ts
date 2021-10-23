import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService){}
    /**
     * retrieves a tag with tagName of tagName from db
     * @param tagName name of tag to be retrieved
     * @returns tag object whose name is tagName
     */
    @Get("/:tagName")
    async getTagByName(@Param('tagName') tagName:string){
        const tag = await this.tagService.getTagByName(tagName)
        return tag
    }
    /**
     * retrieves a list of tag objects, with one object corresponding to a name, if it exists in the db
     * @param tagList list of tagNames
     * @returns list of tag objects where each element corresponds to a tagName
     */
    @Post()
    async getTagList(@Body('tagList') tagList:string[]){
        let list = await this.tagService.getListOfTags(tagList)
        return list
    }
    /*
    @Put("/:tagName")
    async createTag(@Param('tagName') tagName:string){
        let id = await this.tagService.createTag(tagName)
        return id
    }
    */
   /**
    * creates a list of tags objects within db where each tag corresponds to an element in tagList
    * @param tagList list of tagNames to be created in db, if it doesn't already exist
    * @returns list of tag objects corresponding to each tagName in tagList
    */
    @Put()
    async createTagList(@Body('tagList') tagList:string[]){
        let list = await this.tagService.createTagList(tagList)
        return list
    }
    /**
     * edits a tag given by tagId to have tagName
     * @param tagId id of tag to be modified with db
     * @param tagName new name of modified tag
     * @returns modified tag object
     */
    @Patch('/:tagId')
    async editTag(@Param('tagId') tagId: string,
    @Body('tagName') tagName:string){
        let result = this.tagService.editTagById(tagId, tagName);
        return result
    }
}
