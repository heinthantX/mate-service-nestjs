import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMateDto } from './dtos/create-mate.dto';
import { Mate } from './mate.entity';

@Injectable()
export class MatesService {
  constructor(@InjectRepository(Mate) private repo: Repository<Mate>) {}

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  create(mateDto: CreateMateDto) {
    const mate = this.repo.create(mateDto);

    return this.repo.save(mate);
  }

  async update(id: number, attrs: Partial<Mate>) {
    const mate = await this.repo.findOne(id);
    if (!mate) {
      throw new NotFoundException('Mate not found');
    } else {
      Object.assign(mate, attrs);
      return this.repo.save(mate);
    }
  }

  async remove(id: number) {
    const mate = await this.findOne(id);
    if (!mate) {
      throw new NotFoundException('Mate not found');
    }
    return this.repo.remove(mate);
  }
}
