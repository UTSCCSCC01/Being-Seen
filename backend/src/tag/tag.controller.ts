import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService){}

    @Get("/:tagName")
    async getTagByName(@Param('tagName') tagName:string){
        const tag = await this.tagService.getTagByName(tagName)
        return tag
    }

    @Post()
    async getTagList(@Body('tagList') tagList:string[]){
        let list = await this.tagService.getListOfTags(tagList)
        return list
    }
    @Put("/:tagName")
    async createTag(@Param('tagName') tagName:string){
        let id = await this.tagService.createTag(tagName)
        return id
    }
    @Patch('/:tagId')
    async editTag(@Param('tagId') tagId: string,
    @Body('tagName') tagName:string){
        let result = this.tagService.editTagById(tagId, tagName);
        return result
    }
}
