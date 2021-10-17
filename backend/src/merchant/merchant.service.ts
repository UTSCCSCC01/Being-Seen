import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, ObjectId, Schema, Types } from 'mongoose';
import { execPath } from 'process';
import { MerchantDocument } from 'src/Schemas/merchant.schema';
import { Review } from 'src/Schemas/review.schema';
import { Tag } from 'src/Schemas/tag.schema';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel('Merchant')
    private readonly merchantModel: Model<MerchantDocument>,
  ) {}
}
