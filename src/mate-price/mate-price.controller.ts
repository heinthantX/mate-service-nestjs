import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MateAuthGuard } from '../guards/mate-auth.guard';
import { CurrentMate } from '../mates/decorators/current-mate.decorator';
import { Mate } from '../mates/mate.entity';
import { MatesService } from '../mates/mates.service';
import { CreateMatePriceDto } from './dtos/create-mate-price.dto';
import { UpdateMatePriceDto } from './dtos/update-mate-price.dto';
import { MatePrice } from './mate-price.entity';
import { MatePriceService } from './mate-price.service';

@Controller('mates/mateprice')
@ApiTags('mate price')
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
  @UseGuards(MateAuthGuard)
  updateMatePrice(
    @Body() body: UpdateMatePriceDto[],
    @CurrentMate() mate: Mate,
  ) {
    return this.matePriceService.update(mate, body);
  }

  @Get(':id')
  async findAllPrice(@Param('id') id: number) {
    const mate = await this.matesService.findOne(id);
    if (!mate) {
      throw new NotFoundException('mate not found');
    }
    return this.matePriceService.find(mate);
  }
}
