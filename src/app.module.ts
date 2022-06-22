import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatesModule } from './mates/mates.module';
import { MateServiceRequestsModule } from './mate-service-requests/mate-service-requests.module';
import { MateServiceAppointmentsModule } from './mate-service-appointments/mate-service-appointments.module';

@Module({
  imports: [UsersModule, MatesModule, MateServiceRequestsModule, MateServiceAppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
