import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Merchant } from 'src/Schemas/merchant.schema';
import { Tag } from 'src/Schemas/tag.schema';

import { MerchantService } from './merchant.service';

/**
 * Send api requests to  .../merchant/<endpoint>
 */
@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  /**
   * NestJS handler. The request uri to this endpoint is:
   *
   *   GET .../merchant/
   *
   * with no body payload.
   *
   * Gets all merchants.
   *
   * @returns A list of all merchants.
   */
  @Get()
  async getMerchantsHandler(): Promise<Merchant[]> {
    const merchants = await this.merchantService.getAllMerchants();
    return merchants;
  }

  /**
   * NestJS handler. The request uri to this endpoint is:
   *
   *   GET .../merchant/<:id>
   *
   * with no body payload.
   *
   * Gets the merchant with the object id <:id>.
   *
   * @param id The id of the merchant of interest.
   * @returns The requested merchant.
   */
  @Get(':id')
  async getMerchantByIdHandler(@Param('id') id: string): Promise<Merchant> {
    const merchant = await this.merchantService.getMerchantById(id);
    return merchant;
  }

  /**
   * NestJS handler. The request uri to this endpoint is:
   *
   *   POST .../merchant/
   *
   * with a body containing a json file of the format:
   * {
   *   "name": "Test Merchant",
   *   "description": "This is a description",
   *   "address": "1234 abcd Rd.",
   *   "hours": "9-5",
   *   "tags": [
   *     "Tag1",
   *     "Tag2"
   *   ]
   * }
   *
   * Creates a new merchant with the provided fields.
   *
   * @param name The name of the merchant to be created.
   * @param description The description of the merchant to be created.
   * @param tags The tags of the merchant to be created.
   * @param address The address of the merchant to be created.
   * @param hours The working hours of the merchant to be created.
   * @param picture The thumbnail of the merchant to be created.
   * @returns The object id of the merchant created.
   */
  @Post()
  async createMerchantHandler(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('tags') tags: string[],
    @Body('address') address: string,
    @Body('hours') hours: string,
    @Body('picture') picture: string,
  ): Promise<string> {
    const merchantId = await this.merchantService.createMerchant(
      name,
      description,
      address,
      hours,
      picture,
      tags,
    );
    return merchantId;
  }

  /**
   * NestJS handler. The request uri to this endpoint is:
   *
   *   DELETE .../merchant/<:id>
   *
   * with no body payload.
   *
   * Deletes the merchant with object id <:id>
   *
   * @param id The object id of the merchant to be deleted.
   * @returns Number of merchants deleted. Should be 1 on success,
   * and 0 on failure.
   */
  @Delete(':id')
  async deleteMerchantHandler(@Body('id') id: string): Promise<number> {
    const deleteCount = await this.merchantService.deleteMerchant(id);
    return deleteCount;
  }

  /**
   * NestJS handler. The request uri to this endpoint is:
   * 
   *   PUT .../merchant
   * 
   * with the payload of this format: 
   * 
   * NestJS handler. The request uri to this endpoint is:
   *
   *   POST .../merchant/
   *
   * with a body containing a json file of the format:
   * 
   * {
   *   "tagList": [
   *        "tag1",
   *        "tag2"
   *    ]
   * }
   * 
   * returns a list of merchants that have all tags mentioned in tagList
   * @param tagList list of tags to search by
   * @returns returns a list of education resources that have all tags mentioned in tagList
   */
   @Put()
   async searchEducation(@Body('tagList') tagList: string[]) {
     const merList = await this.merchantService.searchMerchantByTags(tagList);
     return merList;
   }
}
