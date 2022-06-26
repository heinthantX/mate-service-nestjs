import { MateRequest } from '../mate-requests/mate-request.entity';
import { Mate } from '../mates/mate.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class MateAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  completed: boolean;

  @OneToOne(() => MateRequest)
  @JoinColumn()
  mateRequest: MateRequest;

  @ManyToOne(() => Mate, (mate) => mate.mateAppointments)
  mate: Mate;

  @ManyToOne(() => User, (user) => user.mateAppointments)
  user: User;
}
