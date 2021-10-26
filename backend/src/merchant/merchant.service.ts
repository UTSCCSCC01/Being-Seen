import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MerchantDocument } from 'src/Schemas/merchant.schema';
import { Merchant } from 'src/Schemas/merchant.schema';
import { Tag } from 'src/Schemas/tag.schema';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel('Merchant')
    private readonly merchantModel: Model<MerchantDocument>,
  ) {}

  /**
   * Returns an array of Merchant instances.
   *
   * @returns All merchants in the database.
   */
  async getAllMerchants(): Promise<Merchant[]> {
    const merchants = await this.merchantModel.find().exec();
    return merchants as Merchant[];
  }

  /**
   * Returns a merchant that has the object id of <id>.
   * @param id The object id of the merchant to be returned.
   * @returns The requested merchant.
   */
  async getMerchantById(id: string): Promise<Merchant> {
    let merchant: Merchant;
    try {
      merchant = await this.merchantModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Merchant with that id does not exist');
    }
    if (!merchant) {
      throw new NotFoundException('Merchant with that id does not exist');
    }
    return merchant;
  }

  /**
   * Create a new merchant.
   *
   * @param name The name of the merchant to be created.
   * @param description The description of the merchant to be created.
   * @param tags The tags of the merchant to be created.
   * @param address The address of the merchant to be created.
   * @param hours The working hours of the merchant to be created.
   * @param picture The thumbnail of the merchant to be created.
   * @returns The object id of the merchant created.
   */
  async createMerchant(
    name: string,
    description: string,
    address: string,
    hours: string,
    picture: string,
    tags: Tag[],
  ): Promise<string> {
    const newMerchant = new this.merchantModel({
      name: name,
      description: description,
      address: address,
      hours: hours,
      pircture: picture,
      tags: this.convertOidArr(tags),
    });
    newMerchant.save();
    return newMerchant.id;
  }

  /**
   * Delete the merchant with the object id <id>.
   *
   * @param id The object id of the merchant to be deleted.
   * @returns Number of objects affected. Should be 1 on success,
   * and 0 on faliure.
   */
  async deleteMerchant(id: string) {
    let deleteCount: number;
    try {
      deleteCount = (await this.merchantModel.deleteOne({ id: id })).n;
    } catch (error) {
      throw new NotFoundException('No such merchant to delete!');
    }
    if (deleteCount === 0) {
      throw new NotFoundException('No such merchant to delete!');
    }
    return deleteCount;
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
