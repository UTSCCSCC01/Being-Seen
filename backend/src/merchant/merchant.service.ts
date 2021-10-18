import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, ObjectId, Schema, Types } from 'mongoose';
import { execPath } from 'process';
import { MerchantDocument } from 'src/Schemas/merchant.schema';
import { Merchant } from 'src/Schemas/merchant.schema';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel('Merchant')
    private readonly merchantModel: Model<MerchantDocument>,
  ) {}

  /**
   * Returns an array of Merchant instances.
   * @returns All merchants in the database.
   */
  async getAllMerchants(): Promise<Merchant[]> {
    const merchants = await this.merchantModel.find().exec();
    return merchants as Merchant[];
  }

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

  async createMerchant(
    name: string,
    description: string,
    address: string,
    hours: string,
    picture: string,
  ): Promise<string> {
    const newMerchant = new this.merchantModel({
      name: name,
      description: description,
      address: address,
      hours: hours,
      pircture: picture,
    });
    newMerchant.save();
    return newMerchant.id;
  }
}
