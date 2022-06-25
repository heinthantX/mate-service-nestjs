import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MateRequest } from '../mate-requests/mate-request.entity';
import { Mate } from '../mates/mate.entity';
import { Repository } from 'typeorm';
import { MateAppointment } from './mate-appointment.entity';

@Injectable()
export class MateAppointmentsService {
  constructor(
    @InjectRepository(MateAppointment)
    private repo: Repository<MateAppointment>,
  ) {}

  async addAppointment(mate: Mate, mateRequest: MateRequest) {
    const appointments = await this.repo.find({ mateRequest });
    if (appointments.length) {
      throw new BadRequestException('you already accepted this request');
    }
    const appointment = this.repo.create();
    appointment.mate = mate;
    appointment.mateRequest = mateRequest;

    return this.repo.save(appointment);
  }

  findAll(mate: Mate, completed: boolean) {
    return this.repo
      .createQueryBuilder('mateAppointment')
      .innerJoinAndSelect('mateAppointment.mateRequest', 'materequest')
      .where('mateAppointment.mateId = :mateId', { mateId: mate.id })
      .andWhere('completed = :completed', { completed })
      .getMany();
  }

  async changeCompletion(id: number, completed: boolean) {
    const appointment = await this.repo.findOne(id);
    appointment.completed = completed;

    return this.repo.save(appointment);
  }
}
