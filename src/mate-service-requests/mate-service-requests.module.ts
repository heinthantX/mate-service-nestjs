import { Module } from '@nestjs/common';
import { MateServiceRequestsService } from './mate-service-requests.service';
import { MateServiceRequestsController } from './mate-service-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateServiceRequest } from './mate-service-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MateServiceRequest])],
  providers: [MateServiceRequestsService],
  controllers: [MateServiceRequestsController],
})
export class MateServiceRequestsModule {}
