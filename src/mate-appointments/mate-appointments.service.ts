import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MateRequest } from '../mate-requests/mate-request.entity';
import { Mate } from '../mates/mate.entity';
import { Like, Repository } from 'typeorm';
import { MateAppointment } from './mate-appointment.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class MateAppointmentsService {
  constructor(
    @InjectRepository(MateAppointment)
    private repo: Repository<MateAppointment>,
  ) {}

  async addAppointment(mate: Mate, user: User, mateRequest: MateRequest) {
    const appointments = await this.repo.find({
      where: { mateRequest: { id: mateRequest.id } },
    });
    if (appointments.length) {
      throw new BadRequestException('you already accepted this request');
    }
    const appointment = this.repo.create();
    appointment.mate = mate;
    appointment.mateRequest = mateRequest;
    appointment.user = user;

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

  async changeCompletion(id: number, user: User, completed: boolean) {
    const appointment = await this.repo.findOneBy({
      user: { id: user.id },
      id,
    });
    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }
    appointment.completed = completed;

    return this.repo.save(appointment);
  }
}
