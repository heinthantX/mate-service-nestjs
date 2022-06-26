import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mate } from '../mates/mate.entity';
import { User } from '../users/user.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Message } from './message.entiy';
import { AppDataSource } from '../app.module';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private repo: Repository<Message>) {}

  sendMessage(content: string, whoSend: string, user: User, mate: Mate) {
    const message = this.repo.create({ content });
    message.user = user;
    message.mate = mate;
    message.whoSend = whoSend;

    return this.repo.save(message);
  }

  async getAllMessages(user: User, mate: Mate, whoSend: string) {
    const sender = this.repo
      .createQueryBuilder()
      .select("content, *, 'sender' AS a")
      .where(`Message.userId = ${user.id}`)
      .andWhere(`Message.mateId = ${mate.id}`)
      .andWhere(`Message.whoSend = '${whoSend.replace(/<[^>]*>?/gm, '')}'`)
      .getQuery();

    if (whoSend == 'mate') {
      whoSend = 'user';
    } else if (whoSend == 'user') {
      whoSend = 'mate';
    }

    const receiver = this.repo
      .createQueryBuilder()
      .select("content, *, 'receiver' AS a")
      .where(`Message.userId = ${user.id}`)
      .andWhere(`Message.mateId= ${mate.id}`)
      .andWhere(`Message.whoSend = '${whoSend.replace(/<[^>]*?/gm, '')}'`)
      .getQuery();

    const messages = AppDataSource.manager.query(
      `${sender} UNION ALL ${receiver} ORDER BY id`,
    );

    return messages;
  }
}
