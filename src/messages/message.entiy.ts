import { Mate } from 'src/mates/mate.entity';
import { User } from 'src/users/user.entity';
import {
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
  whoSend: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  seen: boolean;

  @ManyToOne(() => Mate, (mate) => mate.messages)
  mate: Mate;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
