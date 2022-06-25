import { Mate } from '../mates/mate.entity';
import { User } from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MateRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column('timestamp with time zone')
  time: Date;

  @Column('time')
  duration: Date;

  @Column()
  price: number;

  @Column()
  specialRequest: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => Mate, (mate) => mate.mateRequests)
  mate: Mate;

  @ManyToOne(() => User, (user) => user.mateRequests)
  user: User;
}
