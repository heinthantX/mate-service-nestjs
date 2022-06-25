import { Module } from '@nestjs/common';
import { MateAppointmentsService } from './mate-appointments.service';
import { MateAppointmentsController } from './mate-appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateAppointment } from './mate-appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MateAppointment])],
  providers: [MateAppointmentsService],
  controllers: [MateAppointmentsController],
  exports: [MateAppointmentsService],
})
export class MateAppointmentsModule {}
