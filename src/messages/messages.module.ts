import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entiy';
import { UsersModule } from '../users/users.module';
import { MatesModule } from '../mates/mates.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule, MatesModule],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
