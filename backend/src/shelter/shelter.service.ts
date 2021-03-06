import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TagService } from 'src/tag/tag.service';

import { Shelter, ShelterDocument } from '../Schemas/shelter.schema';

@Injectable()
export class ShelterService {
  constructor(
    @InjectModel('Shelter')
    private readonly shelterModel: Model<ShelterDocument>,
    private readonly tagService: TagService,
  ) {}

  /**
   * retrieves all shelter schemas from db
   * @returns list of shelters from API's shelter collection
   */
  async getAllShelters() {
    const shelters = await this.shelterModel.find().exec();
    return shelters as Shelter[];
  }

  /**
   * retrieves schema of shleter with given id
   * @param  shelterId - id of shelter to display
   * @returns schema of shelter given by shelterId from the db
   */
  async getShelterById(shelterId: string) {
    const shelter = await this.findShelter(shelterId);
    return shelter;
  }

  async getShelterReviewById(shelterId: string, reviewer: string) {
    const shelter = await this.findShelter(shelterId);
    return shelter.reviews.find(
      (review) => review.reviewer.toString() == reviewer,
    );
  }

  /**
   * add review for shelter given by shelterid
   * @param shelterId - id of shelter to get a new review
   * @param  reviewer - id of person leaving review
   * @param  content - content of review
   * @param  rating - rating of review
   */
  async addShelterReview(
    shelterId: string,
    reviewer: string,
    content: string,
    rating: number,
  ) {
    try {
      const shelter = await this.findShelterPrimitive(shelterId);
      shelter.reviews.push({
        reviewer: new Types.ObjectId(reviewer),
        content: content,
        rating: rating,
        date: new Date(),
      });
      this.updateShelterScore(shelter);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * delete review posted by user reviewerId on shelter given by shelterId
   * @param  shelterId - id of shelter to have review removed
   * @param  reviewerId - id of person who left review
   * @returns null
   */
  async deleteShelterReview(shelterId: string, reviewerId: string) {
    const shelter = await this.findShelterPrimitive(shelterId);
    const index = shelter.reviews.findIndex(
      (review) => review.reviewer == reviewerId,
    );
    if (index > -1) {
      shelter.reviews.splice(index, 1);
    }
    this.updateShelterScore(shelter);
    return;
  }
  /**
   * edit review posted by user reviewerId on shelter given by shelterId
   * @param  shelterId - id of shelter to have review edited
   * @param reviewerId - id of person who left/is editing the review
   * @param  content - new content for review
   * @param  rating - new rating for review
   * @returns  null
   */
  async editShelterReview(
    shelterId: string,
    reviewerId: string,
    content: string,
    rating: number,
  ) {
    try {
      const shelter = await this.findShelterPrimitive(shelterId);
      const index = shelter.reviews.findIndex(
        (review) => review.reviewer == reviewerId,
      );
      if (index > -1) {
        if (content) {
          shelter.reviews[index].content = content;
        }
        if (rating) {
          shelter.reviews[index].rating = rating;
        }
      } else {
        console.log('error has occured');
      }
      shelter.markModified('reviews');
      this.updateShelterScore(shelter);
    } catch (error) {
      console.error(error);
    }

    return;
  }
  /**
   * Creates a shelter in db, using given params
   * @param  name - name of shelter to be created within db
   * @param  address - name of address of new shelter
   * @param  postalCode - postal code of new shelter
   * @param  phoneNumber - phone number of new shelter
   * @param  email - email of new shelter
   * @param description - description of new shelter
   * @param hours - hours of new shelter
   * @param  tags - tags used to describe new shelter (in format of string)
   * @param  picture - http address of picture to be used for shelter
   * @returns new shelter id
   */
  async createShelter(
    name: string,
    address: string,
    postalCode: string,
    phoneNumber: string,
    email: string,
    description: string,
    hours: string,
    tags: string[],
    picture: string,
  ) {
    const tagList = await this.tagService.createTagList(tags);
    const newShelter = new this.shelterModel({
      name: name,
      address: address,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
      email: email,
      description: description,
      hours: hours,
      tags: tagList,
      picture: picture,
    });
    newShelter.save();
    return newShelter.id;
  }
  /**
   * returns list of shelters that have tags mentioned in tagList
   * @param tagList list of tags to search by
   * @returns list of shelters that have tags mentioned in tagList
   */
  async searchShelterByTags(tagList: string[]) {
    let shelterList;
    if (tagList.length == 0) shelterList = await this.getAllShelters();
    else
      shelterList = await this.tagService.searchForObjectsWithTags(
        tagList,
        this.shelterModel,
      );
    return shelterList;
  }

  // All Helper Functions Below This Line//
  //--------------------------------------------------------//
  //updates a shelter's score to match that of its revies
  private async updateShelterScore(shelter) {
    if (shelter.reviews.length > 0) {
      //if shelter has reviews
      let sum = 0;
      //tally score up
      for (let i = 0; i < shelter.reviews.length; i++) {
        sum += shelter.reviews[i].rating;
      }
      //avg score and round to one digit then save it to rating
      shelter.rating = Math.round((sum / shelter.reviews.length) * 10) / 10;
    } else {
      shelter.rating = 0;
    }
    shelter.save();
  }

  //helper function used to find a shelter, given its id
  private async findShelter(shelterid: string): Promise<Shelter> {
    let shelter;
    //look up shelter by id in mongodb
    try {
      shelter = await this.shelterModel.findById(shelterid);
    } catch (error) {
      //if code is invalid throw an error
      throw new NotFoundException('Could not find shelter with that id');
    }
    //if doesn't exist throw error
    if (!shelter) {
      throw new NotFoundException('Could not find shelter with that id');
    }
    return shelter;
  }

  //helper function used to find a shelter, given its id while keeping some of its
  //properties from the model
  private async findShelterPrimitive(shelterid: string) {
    let shelter;
    try {
      shelter = await this.shelterModel.findById(shelterid);
    } catch (error) {
      //if code is invalid throw an error
      throw new NotFoundException('Could not find shelter with that id');
    }
    //if doesn't exist throw error
    if (!shelter) {
      throw new NotFoundException('Could not find shelter with that id');
    }
    return shelter;
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
