import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentMate } from '../mates/decorators/current-mate.decorator';
import { Mate } from '../mates/mate.entity';
import { MatesService } from '../mates/mates.service';
import { CreateMatePriceDto } from './dtos/create-mate-price.dto';
import { UpdateMatePriceDto } from './dtos/update-mate-price.dto';
import { MatePrice } from './mate-price.entity';
import { MatePriceService } from './mate-price.service';

@Controller('mates/mateprice')
export class MatePriceController {
  constructor(
    private matePriceService: MatePriceService,
    private matesService: MatesService,
  ) {}

  @Post()
  @UseGuards(MatePrice)
  async addMatePrice(
    @Body() body: CreateMatePriceDto[],
    @CurrentMate() mate: Mate,
  ) {
    const prices = await this.matePriceService.find(mate);
    if (prices.length > 3) {
      throw new BadRequestException('you already added price');
    }
    return this.matePriceService.create(body, mate);
  }

  @Patch()
  @UseGuards(MatePrice)
  updateMatePrice(
    @Body() body: UpdateMatePriceDto[],
    @CurrentMate() mate: Mate,
  ) {
    return this.matePriceService.update(mate, body);
  }

  @Get('/:id')
  async findAllPrice(@Param('id') id: number) {
    const mate = await this.matesService.findOne(id);
    return this.matePriceService.find(mate);
  }
}
