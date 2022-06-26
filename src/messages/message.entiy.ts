import { Mate } from '../mates/mate.entity';
import { User } from '../users/user.entity';
import {
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  whoSend: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ManyToOne(() => Mate, (mate) => mate.messages)
  mate: Mate;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
