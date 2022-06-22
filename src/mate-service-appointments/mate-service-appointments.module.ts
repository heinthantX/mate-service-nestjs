import { Module } from '@nestjs/common';
import { MateServiceAppointmentsService } from './mate-service-appointments.service';
import { MateServiceAppointmentsController } from './mate-service-appointments.controller';

@Module({
  providers: [MateServiceAppointmentsService],
  controllers: [MateServiceAppointmentsController]
})
export class MateServiceAppointmentsModule {}
