import { Module } from '@nestjs/common';
import { MateServiceAppointmentsService } from './mate-service-appointments.service';
import { MateServiceAppointmentsController } from './mate-service-appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateServiceAppointment } from './mate-service-appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MateServiceAppointment])],
  providers: [MateServiceAppointmentsService],
  controllers: [MateServiceAppointmentsController],
})
export class MateServiceAppointmentsModule {}
