import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MateAppointmentsService } from 'src/mate-appointments/mate-appointments.service';
import { Mate } from 'src/mates/mate.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AddRequestDto } from './dtos/add-request.dto';
import { MateRequest } from './mate-request.entity';

@Injectable()
export class MateRequestsService {
  constructor(
    @InjectRepository(MateRequest)
    private repo: Repository<MateRequest>,
    private mateAppointmentsService: MateAppointmentsService,
  ) {}

  async addRequest(mateRequestDto: AddRequestDto, user: User, mate: Mate) {
    const mateRequest = this.repo.create(mateRequestDto);
    mateRequest.user = user;
    mateRequest.mate = mate;

    return this.repo.save(mateRequest);
  }

  async acceptRequest(id: number, mate: Mate) {
    const mateRequest = await this.repo.findOne(id);
    if (!mateRequest) {
      throw new NotFoundException("couldn't found request");
    }
    mateRequest.status = 'accepted';
    this.repo.save(mateRequest);
    return this.mateAppointmentsService.addAppointment(mate, mateRequest);
  }
}
