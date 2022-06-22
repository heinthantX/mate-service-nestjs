import { Module } from '@nestjs/common';
import { MateServiceRequestsService } from './mate-service-requests.service';
import { MateServiceRequestsController } from './mate-service-requests.controller';

@Module({
  providers: [MateServiceRequestsService],
  controllers: [MateServiceRequestsController]
})
export class MateServiceRequestsModule {}
