import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  JobResource,
  JobResourceDocument,
} from 'src/Schemas/jobresource.schema';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('JobResource')
    private readonly jobModel: Model<JobResourceDocument>,
    private readonly tagService: TagService,
  ) {}
  /**
   * Returns all job resources from db
   * @returns all job resrouces from db
   */
  async getAllJobResources() {
    const resources = await this.jobModel.find().exec();
    return resources as JobResource[];
  }
  /**
   * returns job resource given by job id
   * @param jobId - id of job resource to be searched for
   * @returns job resource of given id
   */
  async getJobResourceById(jobId: string) {
    const resource = await this.findJob(jobId);
    return resource;
  }
  /**
   * Creates/modifies job resource within db
   * @param name - new name of resource
   * @param description  new description of resource
   * @param website new website of resource
   * @param email new email of resource
   * @param phoneNumber new phone number of resource
   * @param tags new tags used to describe resource
   * @param address new address of resource
   * @param postalCode new postalCode of resource
   * @param picture url of picture of resources
   * @returns id of new/modified resource
   */
  async createJobResource(
    name: string,
    description: string,
    website = '',
    email = '',
    phoneNumber = '',
    tags = [],
    address = '',
    postalCode = '',
    picture = '',
  ) {
    const tagList = await this.tagService.createTagList(tags);
    const newJob = new this.jobModel({
      name: name,
      description: description,
      tags: tagList,
      website: website,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      postalCode: postalCode,
      picture: picture,
    });
    const result = await newJob.save();
    console.log(result);
    return result.id;
  }
  /**
   * deletes job resource of given id
   * @param jobId - id of resource to be deleted
   */
  async deleteJobResource(jobId: string) {
    const result = await this.jobModel.deleteOne({ _id: jobId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find resource.');
    }
  }

  /**
   * returns a list of job resources that have all tags mentioned in tagList
   * @param tagList list of tags to search by
   * @returns returns a list of job resources that have all tags mentioned in tagList
   */
  async searchJobByTags(tagList: string[]) {
    const result = await this.tagService.searchForObjectsWithTags(
      tagList,
      this.jobModel,
    );
    return result;
  }
  //HELPER FUNCTIONS BELOW THIS LINE
  //---------------------------------------------------
  private async findJob(jobId: string): Promise<JobResource> {
    let job;
    //look up shelter by id in mongodb
    try {
      job = await this.jobModel.findById(jobId);
    } catch (error) {
      //if code is invalid throw an error
      throw new NotFoundException('Could not find shelter with that id');
    }
    //if doesn't exist throw error
    if (!job) {
      throw new NotFoundException('Could not find shelter with that id');
    }

    return job;
  }

  private convertOidArr(arr) {
    try {
      for (let i = 0; i < arr.length; i++) {
        arr[i].id = Types.ObjectId(arr[i].id);
      }
      return arr;
    } catch (error) {
      return [];
    }
  }
}
