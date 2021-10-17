import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Tag } from 'src/Schemas/tag.schema';
import { MerchantService } from './merchant.service';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}
}
