import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Tag } from 'src/Schemas/tag.schema';
import { MerchantService } from './merchant.service';
import { Merchant } from 'src/Schemas/merchant.schema';

/**
 * Send api requests to  .../merchant/<endpoint>
 */
@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Get()
  async getMerchantsHandler(): Promise<Merchant[]> {
    let merchants = await this.merchantService.getAllMerchants();
    return merchants;
  }

  @Get(':id')
  async getMerchantByIdHandler(@Param('id') id: string): Promise<Merchant> {
    let merchant = await this.merchantService.getMerchantById(id);
    return merchant;
  }

  @Post()
  async createMerchantHandler(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('tags') tags: Tag[],
    @Body('address') address: string,
    @Body('hours') hours: string,
    @Body('picture') picture: string,
  ): Promise<string> {
    let merchantId = await this.merchantService.createMerchant(
      name,
      description,
      address,
      hours,
      picture,
    );
    return merchantId;
  }
}
