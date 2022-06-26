import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mate } from '../mates/mate.entity';
import { MatesService } from '../mates/mates.service';
import { Repository } from 'typeorm';
import { CreateMatePriceDto } from './dtos/create-mate-price.dto';
import { MatePrice } from './mate-price.entity';

@Injectable()
export class MatePriceService {
  constructor(
    @InjectRepository(MatePrice) private repo: Repository<MatePrice>,
  ) {}

  find(mate: Mate) {
    return this.repo.find({ relations: { mate: true } });
  }

  create(matePricesDto: CreateMatePriceDto[], mate: Mate) {
    const matePrices = this.repo.create(matePricesDto);
    for (let matePrice of matePrices) {
      matePrice.mate = mate;
    }

    return this.repo.save(matePrices);
  }

  async update(mate: Mate, attrs: Partial<MatePrice>[]) {
    const matePrices = await this.repo.find({ relations: { mate: true } });
    if (!matePrices.length) {
      return;
    }

    for (let attr of attrs) {
      for (let matePrice of matePrices) {
        if (
          attr.duration.toString() + ':00' ===
          matePrice.duration.toString()
        ) {
          Object.assign(matePrice, attr);
        }
      }
    }
    return this.repo.save(matePrices);
  }
}
