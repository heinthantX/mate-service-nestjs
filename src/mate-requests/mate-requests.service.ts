import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MateAppointmentsService } from 'src/mate-appointments/mate-appointments.service';
import { Mate } from 'src/mates/mate.entity';
import { MatesService } from 'src/mates/mates.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dtos/create-request.dto';
import { MateRequest } from './mate-request.entity';

@Injectable()
export class MateRequestsService {
  constructor(
    @InjectRepository(MateRequest)
    private repo: Repository<MateRequest>,
    private matesService: MatesService,
    private mateAppointmentsService: MateAppointmentsService,
  ) {}

  async createRequest(
    mateRequestDto: CreateRequestDto,
    user: User,
    id: number,
  ) {
    const mate = await this.matesService.findOne(id);
    const mateRequest = this.repo.create(mateRequestDto);
    mateRequest.user = user;
    mateRequest.mate = mate;

    return this.repo.save(mateRequest);
  }

  async acceptRequest(id: number, mate: Mate, accepted: boolean) {
    const mateRequest = await this.repo.findOne(id);
    if (!mateRequest) {
      throw new NotFoundException("couldn't find request");
    }
    mateRequest.accepted = accepted;
    this.repo.save(mateRequest);
    return this.mateAppointmentsService.addAppointment(mate, mateRequest);
  }

  findAll(mate: Mate) {
    return this.repo.find({ mate });
  }
}
