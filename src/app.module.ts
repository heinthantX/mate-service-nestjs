import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MatesModule } from './mates/mates.module';
import { MateServiceRequestsModule } from './mate-service-requests/mate-service-requests.module';
import { MateServiceAppointmentsModule } from './mate-service-appointments/mate-service-appointments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Mate } from './mates/mate.entity';
import { MatePriceModule } from './mate-price/mate-price.module';
import { MatePrice } from './mate-price/mate-price.entity';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'heinthant472003',
      database: 'mateservice',
      entities: [User, Mate, MatePrice],
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    MatesModule,
    MateServiceRequestsModule,
    MateServiceAppointmentsModule,
    MatePriceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['heosl'],
        }),
      )
      .forRoutes('*');
  }
}
