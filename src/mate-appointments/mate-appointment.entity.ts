import { MateRequest } from 'src/mate-requests/mate-request.entity';
import { Mate } from 'src/mates/mate.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MateAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'appiontment' })
  status: string;

  @OneToOne(() => MateRequest)
  @JoinColumn()
  mateRequest: MateRequest;

  @ManyToOne(() => Mate, (mate) => mate.mateAppointments)
  mate: Mate;
}
