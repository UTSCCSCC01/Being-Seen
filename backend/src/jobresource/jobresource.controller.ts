import { Controller, Get, Body, Put, Delete, Param, Post } from '@nestjs/common';
import { isPostalCode } from 'class-validator';
import { Tag } from 'src/Schemas/tag.schema';
import { JobService } from './jobresource.service';

@Controller('job')
export class JobResourceController {
  constructor(private readonly jobService: JobService) {}
  /**
   * gets all job resources from db
   * @returns all job resources from db
   */
  @Get()
  async getAllJobResources() {
    const jobResources =
      await this.jobService.getAllJobResources();
    return jobResources;
  }

  /**
   * gets job resource with given id from db
   * @param jobId - id of job resource to be retrieved
   * @returns job resource with given id from db
   */
  @Get('/:jobId')
  async getJobResourceById(@Param('jobId') jobId: string) {
    const resource =
      this.jobService.getJobResourceById(jobId);
    return resource;
  }

  /**
   * creates / modifies job resource in db with given info
   * @param name - name of resource
   * @param description - resource's description
   * @param website - resource's website
   * @param email - resource's email
   * @param phoneNumber - resource's phone number
   * @param tags - tags used to describe resource
   * @param address new address of resource
   * @param postalCode new postalCode of resource
   * @param picture url of picture of resources
   * @returns id of modified or new resource
   */
  @Post()
  async createJobResource(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('website') website: string,
    @Body('email') email: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('tags') tags: string[],
    @Body('address') address:string,
    @Body('postalCode') postalCode:string,
    @Body('picture') picture:string
  ) {
    const newId = await this.jobService.createJobResource(
      name,
      description,
      website,
      email,
      phoneNumber,
      tags,
      address,
      postalCode,
      picture
    );
    return newId;
  }
  /**
   * deletes resource within db given by id
   * @param jobId -id of resource
   * @returns null
   */
  @Delete('/:jobId')
  async deleteJobResourceById(@Param('jobId') jobId: string) {
    await this.jobService.deleteJobResource(jobId);
    return;
  }
}
