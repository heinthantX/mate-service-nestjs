import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatesModule } from './mates/mates.module';
import { MateServiceRequestsModule } from './mate-service-requests/mate-service-requests.module';
import { MateServiceAppointmentsModule } from './mate-service-appointments/mate-service-appointments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'heinthant472003',
      database: 'mateservice',
      entities: [User],
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    MatesModule,
    MateServiceRequestsModule,
    MateServiceAppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
