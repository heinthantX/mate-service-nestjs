import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MateRequest } from 'src/mate-requests/mate-request.entity';
import { Mate } from 'src/mates/mate.entity';
import { Repository } from 'typeorm';
import { MateAppointment } from './mate-appointment.entity';

@Injectable()
export class MateAppointmentsService {
  constructor(
    @InjectRepository(MateAppointment)
    private repo: Repository<MateAppointment>,
  ) {}

  async addAppointment(mate: Mate, mateRequest: MateRequest) {
    const appointment = this.repo.create();
    appointment.mate = mate;
    appointment.mateRequest = mateRequest;

    return this.repo.save(appointment);
  }
}
