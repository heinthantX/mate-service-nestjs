import { Module } from '@nestjs/common';
import { MateRequestsService } from './mate-requests.service';
import { MateRequestsController } from './mate-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateRequest } from './mate-request.entity';
import { MateAppointmentsModule } from 'src/mate-appointments/mate-appointments.module';
import { MatesModule } from 'src/mates/mates.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MateRequest]),
    MatesModule,
    MateAppointmentsModule,
  ],
  providers: [MateRequestsService],
  controllers: [MateRequestsController],
})
export class MateRequestsModule {}
