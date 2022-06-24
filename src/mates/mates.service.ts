import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  // create(userDto: ) {
  //   const mate = this.repo.create(userDto);

  //   return this.repo.save(user);
  // }
}
